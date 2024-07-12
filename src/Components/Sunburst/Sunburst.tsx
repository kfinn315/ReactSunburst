import './Sunburst.css';

import { useLayoutEffect, useMemo, useRef } from 'react';
import SunburstController from './SunburstController';
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import SunburstEvent from './SunburstEvent';
import ArcGroup from '../Arcs/ArcGroup';
import { TreeNode } from '../../Tree/Types';
import { Highlighter } from "../../Highlighter/Types";
import { GetHighlighterMethod } from "../SunburstHighlighter/GetHighlighterMethod";

export interface SunburstProps<T> {
  id?: string
  radius?: number
  duration?: number
  items: HierarchyRectangularNode<TreeNode<T>>[]
  clickEvent?: SunburstEvent<TreeNode<T>>
  mouseEnterEvent?: SunburstEvent<TreeNode<T>>
  mouseLeaveEvent?: SunburstEvent<TreeNode<T>>
  centerElement?: JSX.Element
  getHighlighter?: GetHighlighterMethod<T>
  getArcColor: (d: HierarchyRectangularNode<TreeNode<T>>) => string
  arcIsClickable: (d: HierarchyRectangularNode<TreeNode<T>>) => boolean
}

export default function Sunburst<T>(props: SunburstProps<T>): JSX.Element {
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
  const arcs = new ArcGroup(radius);

  const highlighter: Highlighter<HierarchyNode<TreeNode<T>>> | undefined = getHighlighter?.(gElementRef);

  const controller = useMemo(() => {

    function mouseEnterHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      highlighter?.highlight(d);
      mouseEnterEvent?.(event, d);
    }

    function mouseLeaveHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      highlighter?.clear();
      mouseLeaveEvent?.(event, d);
    }

    function clickEventHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      clickEvent?.(event, d);
    }

    return new SunburstController<TreeNode<T>>(gElementRef,
      {
        duration,
        arcs: arcs,
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
    <g id={id} ref={gElementRef} className={'sb-element'} preserveAspectRatio="xMinYMin meet" transform={`translate(${radius},${radius})`}>
      <g className="arc"></g>
      <g className="mousearc"></g>
      {centerElement}
    </g>
  );
}
