import { SunburstItem } from "../../Types";
import { getHierarchyNode as baseGetHierarchyNode, getTreeNodeHierarchy } from "../getRootHierarchyNode";
import { TreeNode } from "../TreeCreator";
import { getValue } from "./getValue";
import { compare } from "./compare";
import { HierarchyNode } from "d3";

export function getHierarchyNode(root: TreeNode<SunburstItem>): HierarchyNode<TreeNode<SunburstItem>> {
    return baseGetHierarchyNode({ root, getTreeNodeHierarchy, getValue, compare });
}
