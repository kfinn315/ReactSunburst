import { hierarchy, HierarchyNode } from 'd3'

import { TreeNode } from '../TreeCreator'

export type GetTreeNodeHierarchyMethod<TData> = (root: TreeNode<TData>) => HierarchyNode<TreeNode<TData>>

function getChildren<TData>(treeNode: TreeNode<TData>) {
  return treeNode.children
}

export function getTreeNodeHierarchy<TData>(
  root: TreeNode<TData>,
): HierarchyNode<TreeNode<TData>> {
  return hierarchy(root, getChildren)
}
