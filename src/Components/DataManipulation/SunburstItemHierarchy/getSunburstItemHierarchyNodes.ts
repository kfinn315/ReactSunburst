import { HierarchyRectangularNode } from "d3";
import getSegmentNodes from "./getSegmentNodes";
import { SunburstItem } from "../../Types";
import BoxDimensions from "../../../Shared/BoxDimensions";
import createTree from "../../../Tree/Tree";
import { TreeNode } from "../../../Tree/Types";
import SunburstItemPartitionLayout from "./SunburstItemPartitionLayout";

export function getSunburstItemHierarchyNodes(data: SunburstItem[], layoutDimensions: BoxDimensions): HierarchyRectangularNode<TreeNode<SunburstItem>>[] {
    const segmentNodes = getSegmentNodes(data);
    const rootTreeNode = createTree(segmentNodes);
    const partitionLayout = new SunburstItemPartitionLayout();
    return partitionLayout.getLayout(rootTreeNode, layoutDimensions)
}
