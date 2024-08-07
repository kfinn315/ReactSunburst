
import { SunburstItem } from "../../Types"
import { getRootHierarchyNode as baseGetRootHierarchyNode } from "../getRootHierarchyNode"
import { getHierarchyNode } from "./getHierarchyNode"
import { createSunburstItemTree } from "./createSunburstItemTree"

export function getRootHierarchyNode(items: readonly SunburstItem[]) {
    return baseGetRootHierarchyNode<SunburstItem>(items, createSunburstItemTree, getHierarchyNode)
}