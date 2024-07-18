import { HierarchyNode } from 'd3';

import { SunburstItem, SunburstItemTreeNode } from '../../Models';
import { getHierarchy } from '../PartitionLayout/getHierarchy';
import { createTree, SegmentNode, TreeNode } from '../Tree';

function getSegments(item: SunburstItem): string[] {
    return item.name.split('.');
}

function getSunburstItemNodeValue(d: SunburstItemTreeNode) {
    return d.data?.size ?? 0;
}

function sortSunburstItemByDataSize(nodeA: HierarchyNode<SunburstItemTreeNode>, nodeB: HierarchyNode<SunburstItemTreeNode>) {
    return (nodeB.data.data?.size ?? 0) - (nodeA.data.data?.size ?? 0);
}

export function getRootHierarchyNode(items: readonly SunburstItem[]): HierarchyNode<TreeNode<SunburstItem>> {
    const segmentNodes: SegmentNode<SunburstItem>[] = items.map(item => ({ data: item, segments: getSegments(item) }));
    const rootTreeNode = createTree<SunburstItem>(segmentNodes);
    return getHierarchy(rootTreeNode).sum(getSunburstItemNodeValue).sort(sortSunburstItemByDataSize);
}
