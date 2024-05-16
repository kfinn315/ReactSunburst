import { HierarchyRectangularNode, select } from 'd3';
import { MutableRefObject } from 'react';
import { SunburstEvent } from '../Types';
import ArcCollection from '../ArcGenerator/ArcCollection';
import SunburstViewItem from "../Data/Models/SunburstViewItem";

export interface SunburstViewProps<T> {
  duration: number
  arcCollection: ArcCollection
  mouseEnterEvent: SunburstEvent<T>
  mouseLeaveEvent: SunburstEvent<T>
  clickEvent: SunburstEvent<T>
  centerColor: string
}

export default class SunburstView<T extends SunburstViewItem> {
  constructor(private readonly ref: MutableRefObject<SVGGElement | null>, private readonly props: SunburstViewProps<T>) { }

  private readonly getID = (d: HierarchyRectangularNode<T>) => d.data.id;
  private readonly getName = (d: HierarchyRectangularNode<T>) => d.data?.name;
  private readonly getArcColor = (d: HierarchyRectangularNode<T>) => d.data?.arcColor ?? this.props.centerColor;

  initialize(modules: Array<HierarchyRectangularNode<T>> = []): void {
    if (this.ref.current == null) {
      return;
    }
    
    const selection = select<SVGGElement, HierarchyRectangularNode<T>>(this.ref.current);

    const arcGroup = selection.select('.arc');

    const arcs = arcGroup.selectAll<SVGPathElement, HierarchyRectangularNode<T>>('path').data(modules, this.getID);

    const arcsEnter = arcs.enter().append('path');

    arcsEnter
      .merge(arcs)
      .transition()
      .duration(this.props.duration)
      .attr('fill', this.getArcColor)
      .attr('d', this.props.arcCollection.main)
      .attr('data-name', this.getName)
      .attr('data-id', this.getID);

    arcs.exit().remove();

    // Mouse pointer events group //
    const mouseGroup = selection
      .select('.mousearc')
      .attr('fill', 'none')
      .attr('pointer-events', 'all');
    // .on('mouseleave', mouseleaveEvent)

    const mousearcs = mouseGroup
      .selectAll<SVGPathElement, HierarchyRectangularNode<T>>('path')
      .data(modules, this.getID);

    const mousearcsEnter = mousearcs
      .enter()
      .append('path')
      .attr('class', (d) => (d.data.clickable ? 'clickable' : null))
      .attr('data-name', this.getName);

    mousearcsEnter
      .on('mouseenter', (ev: MouseEvent, d) => {
        this.props.mouseEnterEvent(ev, d)
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
}
