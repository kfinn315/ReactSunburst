import { HierarchyNode } from "d3";
import { TreeNode } from "../TreeCreator";
import { GetTreeNodeHierarchyMethod } from "./getTreeNodeHierarchy";

export function getHierarchyNode<T>(
  root: TreeNode<T>,
  getTreeNodeHierarchy: GetTreeNodeHierarchyMethod<T>,
  getValue: (d: TreeNode<T>) => number,
  compare: (a: HierarchyNode<TreeNode<T>>, b: HierarchyNode<TreeNode<T>>) => number
): HierarchyNode<TreeNode<T>> {
  return getTreeNodeHierarchy(root).sum(getValue).sort(compare);
}
