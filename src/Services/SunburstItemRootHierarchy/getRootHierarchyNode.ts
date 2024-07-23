import { HierarchyNode } from "d3";
import { SunburstItem } from "../../Types";
import { TreeNode, createTree } from "../TreeCreator";
import { getHierarchyNode } from "./getHierarchyNode";
import { getSegmentIterator } from "./getSegmentIterator";


export function getRootHierarchyNode(
  items: readonly SunburstItem[]
): HierarchyNode<TreeNode<SunburstItem>> {
  const root = createTree<SunburstItem>(items, (item) => getSegmentIterator(item));
  return getHierarchyNode(root);
}
