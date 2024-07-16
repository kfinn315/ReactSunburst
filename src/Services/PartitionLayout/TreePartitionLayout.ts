import { HierarchyNode, HierarchyRectangularNode, PartitionLayout, partition } from "d3";
import { TreeNode } from "../Tree";
import BoxDimensions from "../../Types/BoxDimensions";
import { getRootHierarchyNode } from "./getRootHierarchyNode";

export function TreePartitionLayout<T>(root: TreeNode<T>, dimensions: BoxDimensions, getNodeValue: (d: TreeNode<T>) => number, sortBy: (a: HierarchyNode<TreeNode<T>>, b: HierarchyNode<TreeNode<T>>) => number): HierarchyRectangularNode<TreeNode<T>> {
  const rootHierarchyNode = getRootHierarchyNode(root).sum(getNodeValue).sort(sortBy);

  const partitionLayout: PartitionLayout<TreeNode<T>> = partition<TreeNode<T>>().size([dimensions.width, dimensions.height]);
  return partitionLayout(rootHierarchyNode);
}
