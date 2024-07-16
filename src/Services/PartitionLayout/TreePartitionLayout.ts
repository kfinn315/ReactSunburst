import { HierarchyNode, HierarchyRectangularNode, PartitionLayout, partition } from "d3";
import { TreeNode } from "../Tree";
import BoxDimensions from "../../Types/BoxDimensions";
import { getRootHierarchyNode } from "./getRootHierarchyNode";

export function TreePartitionLayout<TData>(root: TreeNode<TData>, dimensions: BoxDimensions, getNodeValue: (d: TreeNode<TData>) => number, sortBy: (a: HierarchyNode<TreeNode<TData>>, b: HierarchyNode<TreeNode<TData>>) => number): HierarchyRectangularNode<TreeNode<TData>> {
  const rootHierarchyNode = getRootHierarchyNode(root).sum(getNodeValue).sort(sortBy);

  const partitionLayout: PartitionLayout<TreeNode<TData>> = partition<TreeNode<TData>>().size([dimensions.width, dimensions.height]);
  return partitionLayout(rootHierarchyNode);
}
