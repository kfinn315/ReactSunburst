import './Sunburst.css';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import SunburstController from './SunburstController';
import SunburstEvent from './Types';
import { ArcGroup, Arcs } from '../../Services/Arcs';
import { TreeNode } from '../../Services/Tree';
import { Highlighter } from "../../Services/Highlighter";
import { GetHighlighterMethod } from "../../Services/SunburstHighlighter";

export interface SunburstViewProps<TDatum> {
  id?: string
  radius?: number
  duration?: number
  items: HierarchyRectangularNode<TreeNode<TDatum>>[]
  clickEvent?: SunburstEvent<TreeNode<TDatum>>
  mouseEnterEvent?: SunburstEvent<TreeNode<TDatum>>
  mouseLeaveEvent?: SunburstEvent<TreeNode<TDatum>>
  centerElement?: JSX.Element
  getHighlighter?: GetHighlighterMethod<TDatum>
  getArcColor: (d: HierarchyRectangularNode<TreeNode<TDatum>>) => string
  arcIsClickable: (d: HierarchyRectangularNode<TreeNode<TDatum>>) => boolean
}

export default function SunburstView<TDatum>(props: SunburstViewProps<TDatum>): JSX.Element {
  const {
    id,
    radius = 20,
    clickEvent,
    duration = 100,
    items,
    mouseEnterEvent,
    mouseLeaveEvent,
    centerElement,
    getHighlighter,
    getArcColor,
    arcIsClickable
  } = props;

  const gElementRef = useRef<SVGGElement | null>(null);
  const arcs: Arcs = new ArcGroup(radius);

  const highlighter: Highlighter<HierarchyNode<TreeNode<TDatum>>> | undefined = getHighlighter?.(gElementRef);

  const controller = useMemo(() => {

    function mouseEnterHandler(event: MouseEvent, d: HierarchyNode<TreeNode<TDatum>>): void {
      highlighter?.highlight(d);
      mouseEnterEvent?.(event, d);
    }

    function mouseLeaveHandler(event: MouseEvent, d: HierarchyNode<TreeNode<TDatum>>): void {
      highlighter?.clear();
      mouseLeaveEvent?.(event, d);
    }

    function clickEventHandler(event: MouseEvent, d: HierarchyNode<TreeNode<TDatum>>): void {
      clickEvent?.(event, d);
    }

    return new SunburstController<TreeNode<TDatum>>(gElementRef,
      {
        duration,
        arcs,
        clickEvent: clickEventHandler,
        mouseEnterEvent: mouseEnterHandler,
        mouseLeaveEvent: mouseLeaveHandler,
        getArcColor,
        arcIsClickable
      })
  }, [arcs, clickEvent, duration, highlighter, mouseEnterEvent, mouseLeaveEvent]);

  useLayoutEffect(() => {
    controller.initialize(items)
  }, [items, controller]);

  return (
    <g id={id} ref={gElementRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(radius)},${String(radius)})`}>
      <g className="arc"></g>
      <g className="mousearc"></g>
      {centerElement}
    </g>
  );
}
