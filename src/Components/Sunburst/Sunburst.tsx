import './Sunburst.css';

import { useLayoutEffect, useMemo, useRef } from 'react';
import SunburstController from './SunburstController';
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import SunburstEvent from './SunburstEvent';
import { ArcGroup } from '../Arcs/getArcCollection';
import { IAncestorHighlighter } from '../AncestorHighlighter/AncestorHighlighter';
import { TreeNode } from '../../Tree/Types';
import { GetHighlighterMethod } from "../AncestorHighlighter/GetHighlighterMethod";

export interface SunburstProps<T> {
  id?: string
  radius?: number
  items: HierarchyRectangularNode<TreeNode<T>>[]
  duration?: number
  centerColor?: string
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
    centerColor = 'white',
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
  const arcCollection = new ArcGroup(radius);

  const highlighter: IAncestorHighlighter<HierarchyNode<TreeNode<T>>> | undefined = getHighlighter?.(gElementRef);

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
        centerColor,
        duration,
        arcCollection,
        clickEvent: clickEventHandler,
        mouseEnterEvent: mouseEnterHandler,
        mouseLeaveEvent: mouseLeaveHandler,
        getArcColor,
        arcIsClickable
      })
  }, [arcCollection, centerColor, clickEvent, duration, highlighter, mouseEnterEvent, mouseLeaveEvent]);

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
