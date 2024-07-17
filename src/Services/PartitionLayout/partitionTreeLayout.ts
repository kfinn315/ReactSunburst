import { HierarchyNode, HierarchyRectangularNode, PartitionLayout, partition } from "d3";
import { TreeNode } from "../Tree";
import BoxDimensions from "../../Types/BoxDimensions";

export function partitionTreeLayout<TData>(rootHierarchyNode: HierarchyNode<TreeNode<TData>>, dimensions: BoxDimensions): HierarchyRectangularNode<TreeNode<TData>> {
  const partitionLayout: PartitionLayout<TreeNode<TData>> = partition<TreeNode<TData>>().size([dimensions.width, dimensions.height]);
  return partitionLayout(rootHierarchyNode);
}
