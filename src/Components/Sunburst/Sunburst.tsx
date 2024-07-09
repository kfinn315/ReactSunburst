import './Sunburst.css';

import { useLayoutEffect, useMemo, useRef } from 'react';
import SunburstView from './SunburstView';
import { HierarchyNode, HierarchyRectangularNode, ScaleLinear } from 'd3';
import SunburstEvent from './SunburstEvent';
import { ArcGroup } from '../Arcs/getArcCollection';
import { SunburstItem } from "../Types";
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
  colorScale: ScaleLinear<string, string, never>
  getHighlighter?: GetHighlighterMethod<T>
}

export default function Sunburst<T extends SunburstItem>(props: SunburstProps<T>): JSX.Element {
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
    colorScale,
    getHighlighter
  } = props;

  const gElementRef = useRef<SVGGElement | null>(null);
  const arcCollection = new ArcGroup(radius);

  const highlighter: IAncestorHighlighter<HierarchyNode<TreeNode<T>>> | undefined = getHighlighter?.(gElementRef);

  const view = useMemo(() => {

    function mouseEnterHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      highlighter?.highlight(d);
      mouseEnterEvent?.(event, d);
    }

    function mouseLeaveHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      highlighter?.clear();
      mouseLeaveEvent?.(event, d);
    }

    function clickEventHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      if (d?.data?.data?.clickable) {
        clickEvent?.(event, d);
      } else {
        console.info("sunburst click event was stopped")
      }
    }

    return new SunburstView<TreeNode<T>>(gElementRef,
      {
        centerColor,
        duration,
        arcCollection,
        clickEvent: clickEventHandler,
        mouseEnterEvent: mouseEnterHandler,
        mouseLeaveEvent: mouseLeaveHandler,
        colorScale
      })
  }, [arcCollection, centerColor, clickEvent, duration, highlighter, mouseEnterEvent, mouseLeaveEvent]);

  useLayoutEffect(() => {
    view.initialize(items)
  }, [items, view]);

  return (
    <g id={id} ref={gElementRef} className={'sb-element'} preserveAspectRatio="xMinYMin meet" transform={`translate(${radius},${radius})`}>
      <g className="arc"></g>
      <g className="mousearc"></g>
      {centerElement}
    </g>
  );
}
