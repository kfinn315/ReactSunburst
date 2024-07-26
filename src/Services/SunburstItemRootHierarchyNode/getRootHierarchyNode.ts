import { HierarchyNode } from "d3"

import { SunburstItem } from "../../Types"
import { createTree, TreeNode } from "../TreeCreator"
import { getSegmentIterator } from "./getSegmentIterator"
import { getTreeNodeHierarchy, getHierarchyNode, getRootHierarchyNode } from "../getRootHierarchyNode"
import { getValue } from "./getValue"
import { compare } from "./compare"

export const createSunburstItemTree = (items: readonly SunburstItem[]) => {
    return createTree(items, getSegmentIterator)
}

export const getSunburstItemHierarchyNode: (root: TreeNode<SunburstItem>) => HierarchyNode<TreeNode<SunburstItem>> = (root: TreeNode<SunburstItem>) => {
    return getHierarchyNode(root, getTreeNodeHierarchy, getValue, compare)
}

export function getSunburstItemRootHierarchyNode(items: readonly SunburstItem[]) {
    return getRootHierarchyNode<SunburstItem>(items, createSunburstItemTree, getSunburstItemHierarchyNode)
}