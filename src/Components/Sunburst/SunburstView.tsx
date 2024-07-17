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
  onClick?: SunburstEvent<TreeNode<TDatum>>
  onMouseEnter?: SunburstEvent<TreeNode<TDatum>>
  onMouseLeave?: SunburstEvent<TreeNode<TDatum>>
  centerElement?: JSX.Element
  getHighlighter?: GetHighlighterMethod<TDatum>
  getArcColor: (d: HierarchyRectangularNode<TreeNode<TDatum>>) => string
  isArcClickable: (d: HierarchyRectangularNode<TreeNode<TDatum>>) => boolean
}

export default function SunburstView<TDatum>(props: SunburstViewProps<TDatum>): JSX.Element {
  const {
    id,
    radius = 20,
    duration = 100,
    items,
    centerElement,
    onClick,
    onMouseEnter,
    onMouseLeave,
    getHighlighter,
    getArcColor,
    isArcClickable
  } = props;

  const gElementRef = useRef<SVGGElement | null>(null);
  const arcs: Arcs = new ArcGroup(radius);

  const highlighter: Highlighter<HierarchyNode<TreeNode<TDatum>>> | undefined = getHighlighter?.(gElementRef);

  const controller = useMemo(() => {

    function mouseEnterHandler(event: MouseEvent, d: HierarchyNode<TreeNode<TDatum>>): void {
      highlighter?.highlight(d);
      onMouseEnter?.(event, d);
    }

    function mouseLeaveHandler(event: MouseEvent, d: HierarchyNode<TreeNode<TDatum>>): void {
      highlighter?.clear();
      onMouseLeave?.(event, d);
    }

    function clickHandler(event: MouseEvent, d: HierarchyNode<TreeNode<TDatum>>): void {
      onClick?.(event, d);
    }

    function getMouseArcPathClass(d: HierarchyRectangularNode<TreeNode<TDatum>>): string | null {
      return isArcClickable(d) ? 'clickable' : null
    }

    return new SunburstController<TreeNode<TDatum>>(gElementRef,
      {
        duration,
        arcs,
        onClick: clickHandler,
        onMouseEnter: mouseEnterHandler,
        onMouseLeave: mouseLeaveHandler,
        getArcColor,
        getMouseArcPathClass
      })
  }, [arcs, duration, highlighter, onMouseEnter, onMouseLeave, onClick]);

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
