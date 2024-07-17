import { HierarchyNode, hierarchy } from "d3";
import { TreeNode } from "../Tree";

export function getHierarchy<TData>(root: TreeNode<TData>): HierarchyNode<TreeNode<TData>> {
  return hierarchy(root, x => x.children);
}
