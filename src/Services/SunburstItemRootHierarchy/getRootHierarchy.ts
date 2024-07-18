import { HierarchyNode } from 'd3'

import { SunburstItem, SunburstItemTreeNode } from '../../Models'
import { createTree, SegmentNode, TreeNode } from '../TreeCreator'
import { getHierarchy } from './getHierarchy'

function getSegments(item: SunburstItem): string[] {
  return item.name.split('.')
}

function getValue(d: SunburstItemTreeNode) {
  return d.data?.size ?? 0
}

function sortByValue(
  nodeA: HierarchyNode<SunburstItemTreeNode>,
  nodeB: HierarchyNode<SunburstItemTreeNode>,
) {
  return getValue(nodeB.data) - getValue(nodeA.data)
}

function getHierarchyNode(
  root: TreeNode<SunburstItem>,
): HierarchyNode<TreeNode<SunburstItem>> {
  return getHierarchy(root).sum(getValue).sort(sortByValue)
}

export function getRootHierarchyNode(
  items: readonly SunburstItem[],
): HierarchyNode<TreeNode<SunburstItem>> {
  const segmentNodes: SegmentNode<SunburstItem>[] = items.map((item) => ({
    data: item,
    segments: getSegments(item),
  }))
  const root = createTree<SunburstItem>(segmentNodes)
  return getHierarchyNode(root)
}
