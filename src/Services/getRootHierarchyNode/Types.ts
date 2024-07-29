import { HierarchyNode } from "d3";
import { TreeNode } from "../TreeCreator";

export type GetTreeNodeHierarchy<TData> = (root: TreeNode<TData>) => HierarchyNode<TreeNode<TData>>;
