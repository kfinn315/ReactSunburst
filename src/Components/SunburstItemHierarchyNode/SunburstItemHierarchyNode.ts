import { HierarchyRectangularNode } from "d3";
import { SunburstItem, SunburstItemTreeNode } from "../Types";
import BoxDimensions from "../../Shared/BoxDimensions";
import createTree from "../../Tree/Tree";
import { getSunburstHierarchyRectangularNode as getSunburstHierarchyRectangularNode } from "./getSunburstHierarchyRectangularNode";
import { convertToSegmentNode } from "./convertToSegmentNode";

export default function SunburstItemHierarchyNode(items: SunburstItem[], layoutDimensions: BoxDimensions): HierarchyRectangularNode<SunburstItemTreeNode> {
    const segmentNodes = items.map(item => convertToSegmentNode(item))
    const rootTreeNode = createTree<SunburstItem>(segmentNodes)
    return getSunburstHierarchyRectangularNode(rootTreeNode, layoutDimensions)
}
