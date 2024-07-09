import { HierarchyRectangularNode } from "d3";
import getSegmentNodes from "./getSegmentNodes";
import { SunburstItem, SunburstItemTreeNode } from "../../Types";
import BoxDimensions from "../../../Shared/BoxDimensions";
import createTree from "../../../Tree/Tree";
import SunburstItemPartitionLayout from "./SunburstItemPartitionLayout";

export function getSunburstItemHierarchyNodes(data: SunburstItem[], layoutDimensions: BoxDimensions): HierarchyRectangularNode<SunburstItemTreeNode>[] {
    const segmentNodes = getSegmentNodes(data);
    const rootTreeNode = createTree(segmentNodes);
    const partitionLayout = new SunburstItemPartitionLayout();
    return partitionLayout.getLayout(rootTreeNode, layoutDimensions)
}
