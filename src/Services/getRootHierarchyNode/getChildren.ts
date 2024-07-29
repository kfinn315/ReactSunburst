import { TreeNode } from "../TreeCreator";

export function getChildren<TData>(treeNode: TreeNode<TData>) {
  return treeNode.children;
}
