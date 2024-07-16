import { HierarchyRectangularNode, select } from 'd3';
import { MutableRefObject } from 'react';
import SunburstEvent from './Types';
import { Arcs } from '../../Services/Arcs';
import { TreeNode } from '../../Services/Tree';

export interface Props<T> {
  duration: number
  arcs: Arcs
  mouseEnterEvent: SunburstEvent<T>
  mouseLeaveEvent: SunburstEvent<T>
  clickEvent: SunburstEvent<T>
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  arcIsClickable: (d: HierarchyRectangularNode<T>) => boolean
}

export default class SunburstController<T extends TreeNode<unknown>> {
  constructor(
    private readonly ref: MutableRefObject<SVGGElement | null>,
    private readonly props: Props<T>
  ) { }

  #getID(d: HierarchyRectangularNode<T>) {
    return d.data.id;
  }
  /**
   * Initializes and updates the sunburst chart based on the provided items data
   * @param items 
   * @returns 
   */
  initialize(items: Array<HierarchyRectangularNode<T>> = []): void {
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

    const selection = select<SVGGElement, HierarchyRectangularNode<T>>(
      this.ref.current
    );

    const createArcs = () => {
      const arcGroup = selection.select('.arc');

      const arcs = arcGroup
        .selectAll<SVGPathElement, HierarchyRectangularNode<T>>('path')
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
        .selectAll<SVGPathElement, HierarchyRectangularNode<T>>('path')
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
        .on('mouseout', (ev, d) => { mouseLeaveEvent(ev, d); })
        .on('click', (ev, d) => { clickEvent(ev, d); })
        .merge(mousearcs)
        .transition()
        .duration(duration)
        .attr('d', arcCollection.basic);

      //animate arc removal - arc radii become zero (arcCollection.zero)
      mousearcs
        .exit<HierarchyRectangularNode<T>>()
        .transition()
        .duration(duration)
        .attr('d', arcCollection.zero)
        .remove();
    }

    createArcs();

    createMouseArcs();

  }
}
