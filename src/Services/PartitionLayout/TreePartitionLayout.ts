import { HierarchyNode, HierarchyRectangularNode, PartitionLayout, partition } from "d3";
import UndefinedArgumentError from "../../Shared/UndefinedArgumentError";
import { TreeNode } from "../Tree";
import BoxDimensions from "../../Shared/BoxDimensions";
import { getRootHierarchyNode } from "./getRootHierarchyNode";

export function TreePartitionLayout<T>(root: TreeNode<T>, dimensions: BoxDimensions, getNodeValue: (d: TreeNode<T>) => number, sortBy: (a: HierarchyNode<TreeNode<T>>, b: HierarchyNode<TreeNode<T>>) => number): HierarchyRectangularNode<TreeNode<T>> {
  if (root == null) {
    throw new UndefinedArgumentError('root');
  }
  if (dimensions == null) {
    throw new UndefinedArgumentError('dimensions');
  }

  const rootHierarchyNode = getRootHierarchyNode(root).sum(getNodeValue).sort(sortBy);

  const partitionLayout: PartitionLayout<TreeNode<T>> = partition<TreeNode<T>>().size([dimensions.width, dimensions.height]);
  return partitionLayout(rootHierarchyNode);

}
