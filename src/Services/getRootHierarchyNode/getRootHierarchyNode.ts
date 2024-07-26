import { HierarchyNode } from "d3";
import { TreeNode } from "../TreeCreator";

export function getRootHierarchyNode<T>(
  items: readonly T[],
  createTree: (items: readonly T[]) => TreeNode<T>,
  getHierarchyNode: (root: TreeNode<T>) => HierarchyNode<TreeNode<T>>,
): HierarchyNode<TreeNode<T>> {
  const root = createTree(items);
  return getHierarchyNode(root);
}
