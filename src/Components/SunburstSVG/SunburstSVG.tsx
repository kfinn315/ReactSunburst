import { HierarchyRectangularNode } from 'd3';
import Sunburst from '../Sunburst/Sunburst';
import SunburstEvent from '../Sunburst/SunburstEvent';
import getHierarchyNodes from '../Tree/getHierarchyNodes';
import SunburstViewItem from "../../Models/SunburstViewItem";
import SunburstViewItemPartitionLayout from './SunburstViewItemPartitionLayout';
import Dimensions from '../../Shared/Dimensions';
import SunburstViewItemTN from './SunburstViewItemTN';
import getTreeNodes from './getTreeNodes';

export interface Props {
  radius: number
  data: SunburstViewItem[]
  duration?: number
  centerColor?: string
  clickEvent?: SunburstEvent<SunburstViewItemTN>
  mouseEnterEvent?: SunburstEvent<SunburstViewItemTN>
  mouseLeaveEvent?: SunburstEvent<SunburstViewItemTN>
  centerElement?: JSX.Element
  getSegments: (item: SunburstViewItem) => string[]
}

function getCanvasDimensions(radius: number): Dimensions {
  return {
    width: 2 * Math.PI,
    height: radius * radius
  };
}

export default function SunburstSVG(props: Props): JSX.Element {
  const { data, radius, getSegments, centerColor, centerElement, clickEvent, duration, mouseEnterEvent, mouseLeaveEvent
  } = props;

  const layoutDimensions = getCanvasDimensions(radius);

  function getSunburstViewHierarchy() {
    const treeNodes = getTreeNodes(data, getSegments);

    const hierarchyNodes: HierarchyRectangularNode<SunburstViewItemTN>[] = getHierarchyNodes<SunburstViewItem>({ dimensions: layoutDimensions, items: treeNodes, partitionLayout: new SunburstViewItemPartitionLayout() });
    return hierarchyNodes;
  }

  const hierarchyNodes: HierarchyRectangularNode<SunburstViewItemTN>[] = getSunburstViewHierarchy();

  return <svg width={radius * 2} height={radius * 2}>
    <Sunburst<SunburstViewItemTN> radius={radius} data={hierarchyNodes} centerColor={centerColor} centerElement={centerElement} clickEvent={clickEvent} duration={duration} mouseEnterEvent={mouseEnterEvent} mouseLeaveEvent={mouseLeaveEvent} />
  </svg>;
}
