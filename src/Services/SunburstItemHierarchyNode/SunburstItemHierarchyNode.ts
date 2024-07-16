import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import BoxDimensions from "../../Shared/BoxDimensions";
import { SegmentNode, createTree } from "../Tree";
import { TreePartitionLayout } from '../PartitionLayout';
import { SunburstItem, SunburstItemTreeNode } from '../../Models';


function getSegments(item: SunburstItem): string[] {
    return item.name.split('.');
}

function getSunburstItemNodeValue(d: SunburstItemTreeNode) {
    return d.data?.size ?? 0;
}

function sortSunburstItemByDataSize(nodeA: HierarchyNode<SunburstItemTreeNode>, nodeB: HierarchyNode<SunburstItemTreeNode>) {
    return (nodeB.data.data?.size ?? 0) - (nodeA.data.data?.size ?? 0);
}

function getSunburstHierarchyRectangularNode(root: SunburstItemTreeNode, dimensions: BoxDimensions): HierarchyRectangularNode<SunburstItemTreeNode> {
    return TreePartitionLayout<SunburstItem>(root, dimensions, getSunburstItemNodeValue, sortSunburstItemByDataSize);
}

export default function SunburstItemHierarchyNode(items: SunburstItem[], layoutDimensions: BoxDimensions): HierarchyRectangularNode<SunburstItemTreeNode> {
    const segmentNodes: Array<SegmentNode<SunburstItem>> = items.map(item => ({ data: item, segments: getSegments(item) }))
    const rootTreeNode = createTree<SunburstItem>(segmentNodes)
    return getSunburstHierarchyRectangularNode(rootTreeNode, layoutDimensions)
}
