import './Sunburst.css';

import { useLayoutEffect, useMemo, useRef } from 'react';

import SunburstView from './SunburstView/SunburstView';
import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import SunburstEvent from './SunburstEvent';
import getArcGenerators from '../ArcGenerator/getArcGenerators';
import SunburstViewItem from "../../Models/SunburstViewItem";
import getArcAncestorHighlighter from './getAncestorHighlighter';
import getElementsFromSelectors from '../../Shared/GetElements/getElementsFromSelectors';

export interface SunburstProps<T> {
  id?: string
  radius?: number
  data: HierarchyRectangularNode<T>[]
  duration?: number
  centerColor?: string
  clickEvent?: SunburstEvent<T>
  mouseEnterEvent?: SunburstEvent<T>
  mouseLeaveEvent?: SunburstEvent<T>
  centerElement?: JSX.Element
}

export default function Sunburst<T extends SunburstViewItem>(props: SunburstProps<T>): JSX.Element {
  const {
    id,
    centerColor = 'white',
    radius = 20,
    clickEvent,
    duration = 100,
    data,
    mouseEnterEvent,
    mouseLeaveEvent,
    centerElement,
  } = props;

  const gElementRef = useRef<SVGGElement | null>(null);
  const arcCollection = getArcGenerators(radius);

  function getPathSelector(item?: SunburstViewItem): string {
    if (item == null) {
      return '.arc>path';
    }
    else if (item.name === "root") {
      return `.arc>path[data-name="${item.name}"]`;
    }
    return `.arc>path[data-id="${item.id}"]`;
  }
  const getElementMethods = getElementsFromSelectors<T, SVGGElement, SVGPathElement>(gElementRef, getPathSelector);
  const highlighter = getArcAncestorHighlighter<T>(getElementMethods);

  const view = useMemo(() => {

    function mouseEnterHandler(event: MouseEvent, d: HierarchyNode<T>): void {
      highlighter.highlight(d);
      mouseEnterEvent?.(event, d);
    }

    function mouseLeaveHandler(event: MouseEvent, d: HierarchyNode<T>): void {
      highlighter.reset();
      mouseLeaveEvent?.(event, d);
    }

    function clickEventHandler(event: MouseEvent, d: HierarchyNode<T>): void {
      if (d?.data?.clickable) {
        clickEvent?.(event, d);
      } else {
        console.info("sunburst click event was stopped")
      }
    }

    return new SunburstView<T>(gElementRef,
      {
        centerColor,
        duration,
        arcCollection,
        clickEvent: clickEventHandler,
        mouseEnterEvent: mouseEnterHandler,
        mouseLeaveEvent: mouseLeaveHandler
      })
  }, [arcCollection, centerColor, clickEvent, duration, highlighter, mouseEnterEvent, mouseLeaveEvent]);

  useLayoutEffect(() => {
    view.initialize(data)
  }, [data, view]);

  return (
    <g id={id} ref={gElementRef} className={'sb-element'} preserveAspectRatio="xMinYMin meet" transform={`translate(${radius},${radius})`}>
      <g className="arc"></g>
      <g className="mousearc"></g>
      {centerElement}
    </g>
  );
}
