import './Sunburst.css';

import { useLayoutEffect, useMemo, useRef } from 'react';

import SunburstView from './SunburstView/SunburstView';
import { HierarchyNode, HierarchyRectangularNode, ScaleLinear } from 'd3';
import SunburstEvent from './SunburstEvent';
import getArcGenerators from '../ArcGenerator/getArcGenerators';
import { SunburstItem } from "../Types";
import AncestorHighlighter from '../Highlighter/AncestorHighlighter';
import ElementProvider from '../../Shared/ElementProvider/ElementProvider';
// import SunburstItemTreeNode from '../SunburstSVG/SunburstItemTreeNode';
import { TreeNode } from '../../Tree/Types';

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
  } = props;

  const gElementRef = useRef<SVGGElement | null>(null);
  const arcCollection = getArcGenerators(radius);

  function getPathSelector(item?: TreeNode<SunburstItem>): string {
    if (item == null) {
      return '.arc>path';
    }
    else if (item.name === "root") {
      return `.arc>path[data-name="${item.name}"]`;
    }
    return `.arc>path[data-id="${item.data?.id}"]`;
  }
  const elementProvider = ElementProvider<TreeNode<T>, SVGGElement, SVGPathElement>(gElementRef, getPathSelector);
  const highlighter = AncestorHighlighter<TreeNode<T>>(elementProvider);

  const view = useMemo(() => {

    function mouseEnterHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      highlighter.highlight(d);
      mouseEnterEvent?.(event, d);
    }

    function mouseLeaveHandler(event: MouseEvent, d: HierarchyNode<TreeNode<T>>): void {
      highlighter.reset();
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
