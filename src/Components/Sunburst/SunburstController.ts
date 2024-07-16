import { HierarchyRectangularNode, select } from 'd3';
import { MutableRefObject } from 'react';
import SunburstEvent from './Types';
import { Arcs } from '../../Services/Arcs';
import { TreeNode } from '../../Services/Tree';

export interface SunburstControllerProps<TNode> {
  duration: number
  arcs: Arcs
  mouseEnterEvent: SunburstEvent<TNode>
  mouseLeaveEvent: SunburstEvent<TNode>
  clickEvent: SunburstEvent<TNode>
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string
  arcIsClickable: (d: HierarchyRectangularNode<TNode>) => boolean
}

export default class SunburstController<TNode extends TreeNode<unknown>> {
  constructor(
    private readonly ref: MutableRefObject<SVGGElement | null>,
    private readonly props: SunburstControllerProps<TNode>
  ) { }

  #getID = (d: HierarchyRectangularNode<TNode>) => {
    return d.data.id;
  }
  /**
   * Initializes and updates the sunburst chart based on the provided items data
   * @param items 
   * @returns 
   */
  initialize(items: HierarchyRectangularNode<TNode>[] = []): void {
    const {
      arcs: arcCollection,
      arcIsClickable,
      clickEvent,
      duration,
      getArcColor,
      mouseEnterEvent,
      mouseLeaveEvent
    } = this.props;

    if (!this.ref.current) {
      return;
    }

    const selection = select<SVGGElement, HierarchyRectangularNode<TNode>>(
      this.ref.current
    );

    const createArcs = () => {
      const arcGroup = selection.select('.arc');

      const arcs = arcGroup
        .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
        .data(items, this.#getID);

      const arcsEnter = arcs.enter().append('path');

      arcsEnter
        .merge(arcs)
        .transition()
        .duration(duration)
        .attr('fill', getArcColor)
        .attr('d', arcCollection.padded)
        .attr('data-id', this.#getID);

      arcs.exit().remove();
    }

    const createMouseArcs = () => {
      // Mouse pointer events group //
      const mouseGroup = selection
        .select('.mousearc')
        .attr('fill', 'none')
        .attr('pointer-events', 'all');
      // .on('mouseleave', mouseleaveEvent)
      const mousearcs = mouseGroup
        .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
        .data(items, this.#getID);

      const mousearcsEnter = mousearcs
        .enter()
        .append('path')
        .attr('class', (d) => (arcIsClickable(d) ? 'clickable' : null))
        .attr('data-id', this.#getID);

      mousearcsEnter
        .on('mouseenter', (ev: MouseEvent, d) => {
          mouseEnterEvent(ev, d);
        })
        .on('mouseout', (ev: MouseEvent, d) => { mouseLeaveEvent(ev, d); })
        .on('click', (ev: MouseEvent, d) => { clickEvent(ev, d); })
        .merge(mousearcs)
        .transition()
        .duration(duration)
        .attr('d', arcCollection.basic);

      //animate arc removal - arc radii become zero (arcCollection.zero)
      mousearcs
        .exit<HierarchyRectangularNode<TNode>>()
        .transition()
        .duration(duration)
        .attr('d', arcCollection.zero)
        .remove();
    }

    createArcs();

    createMouseArcs();

  }
}
