import { HierarchyRectangularNode } from 'd3';
import Sunburst from '../Sunburst/Sunburst';
import { SunburstEvent } from '../Sunburst/Types';
import getHierarchyNodes from '../Sunburst/Data/getHierarchyNodes';
import SunburstViewItem from "../Sunburst/Data/Models/SunburstViewItem";
import SegmentNode from "../Sunburst/Data/Models/SegmentNode";
import TreeNode from '../Sunburst/Data/Models/TreeNode';
import SunburstViewItemPartitionLayout from './SunburstViewItemPartitionLayout';
import { Dimensions } from '../D3Types';


export type SunburstViewItemTN = TreeNode<SunburstViewItem>;

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

function getTreeNodes(items: SunburstViewItem[], getSegments: (item: SunburstViewItem) => string[]): SegmentNode<SunburstViewItem>[] {
  function getName(segments: string[]): string {
    return segments?.[segments.length - 1] ?? ""
  }

  const treeNodes: SegmentNode<SunburstViewItem>[] = items.map(item => {
    const segments = getSegments(item)
    const name = getName(segments);
    const data: SunburstViewItem = { ...item, name }
    return { segments: segments.values(), data } as SegmentNode<SunburstViewItem>
  });

  return treeNodes;
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

    const hierarchyNodes: HierarchyRectangularNode<SunburstViewItemTN>[] = getHierarchyNodes({ dimensions: layoutDimensions, items: treeNodes, partitionLayout: new SunburstViewItemPartitionLayout() });
    return hierarchyNodes;
  }

  const hierarchyNodes: HierarchyRectangularNode<SunburstViewItemTN>[] = getSunburstViewHierarchy();

  return <svg width={radius * 2} height={radius * 2}>
    <Sunburst<SunburstViewItemTN> radius={radius} data={hierarchyNodes} centerColor={centerColor} centerElement={centerElement} clickEvent={clickEvent} duration={duration} mouseEnterEvent={mouseEnterEvent} mouseLeaveEvent={mouseLeaveEvent} />
  </svg>;

}
