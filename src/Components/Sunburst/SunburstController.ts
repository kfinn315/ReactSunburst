import { HierarchyRectangularNode, select } from 'd3';
import { MutableRefObject } from 'react';
import SunburstEvent from './SunburstEvent';
import { ArcCollection } from '../Arcs/Types';
import { TreeNode } from '../../Tree/Types';

export interface SunburstViewProps<T> {
  duration: number
  arcCollection: ArcCollection
  mouseEnterEvent: SunburstEvent<T>
  mouseLeaveEvent: SunburstEvent<T>
  clickEvent: SunburstEvent<T>
  centerColor: string
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  arcIsClickable: (d: HierarchyRectangularNode<T>) => boolean
}

export default class SunburstController<T extends TreeNode<unknown>> {
  constructor(private readonly ref: MutableRefObject<SVGGElement | null>, private readonly props: SunburstViewProps<T>) { }
  #getID(d: HierarchyRectangularNode<T>) {
    return d.data.id;
  }
  initialize(items: Array<HierarchyRectangularNode<T>> = []): void {

    if (this.ref.current == null) {
      return;
    }

    const selection = select<SVGGElement, HierarchyRectangularNode<T>>(this.ref.current);

    const createArcs = () => {
      const arcGroup = selection.select('.arc');

      const arcs = arcGroup.selectAll<SVGPathElement, HierarchyRectangularNode<T>>('path').data(items, this.#getID);

      const arcsEnter = arcs.enter().append('path');

      arcsEnter
        .merge(arcs)
        .transition()
        .duration(this.props.duration)
        .attr('fill', this.props.getArcColor)
        .attr('d', this.props.arcCollection.main)
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
        .attr('class', (d) => (this.props.arcIsClickable(d) ? 'clickable' : null))
        .attr('data-id', this.#getID);

      mousearcsEnter
        .on('mouseenter', (ev: MouseEvent, d) => {
          this.props.mouseEnterEvent(ev, d);
        })
        .on('mouseout', (ev, d) => { this.props.mouseLeaveEvent(ev, d); })
        .on('click', (ev, d) => { this.props.clickEvent(ev, d); })
        .merge(mousearcs)
        .transition()
        .duration(this.props.duration)
        .attr('d', this.props.arcCollection.mouse);

      //animate arc removal - arc radii become zero (arcCollection.zero)
      mousearcs
        .exit<HierarchyRectangularNode<T>>()
        .transition()
        .duration(this.props.duration)
        .attr('d', this.props.arcCollection.zero)
        .remove();
    }

    createArcs();

    createMouseArcs();

  }
}
