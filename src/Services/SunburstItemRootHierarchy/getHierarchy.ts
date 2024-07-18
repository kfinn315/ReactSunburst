import { hierarchy, HierarchyNode } from 'd3'

import { TreeNode } from '../TreeCreator'

export function getHierarchy<TData>(
  root: TreeNode<TData>,
): HierarchyNode<TreeNode<TData>> {
  return hierarchy(root, (x) => x.children)
}