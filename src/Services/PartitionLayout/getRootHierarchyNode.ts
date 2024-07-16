import { HierarchyNode, hierarchy } from "d3";
import { TreeNode } from "../Tree";


export function getRootHierarchyNode<T>(root: TreeNode<T>): HierarchyNode<TreeNode<T>> {
  return hierarchy(root, x => x.children);
}
