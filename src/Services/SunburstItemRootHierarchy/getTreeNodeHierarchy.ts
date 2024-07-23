import { hierarchy, HierarchyNode } from 'd3'

import { TreeNode } from '../TreeCreator'

export function getTreeNodeHierarchy<TData>(
  root: TreeNode<TData>,
): HierarchyNode<TreeNode<TData>> {
  const getChildren = (treeNode: TreeNode<TData>) => treeNode.children
  return hierarchy(root, getChildren)
}
