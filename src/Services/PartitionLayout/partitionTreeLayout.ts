import {
  HierarchyNode,
  HierarchyRectangularNode,
  partition,
  PartitionLayout,
} from 'd3'

import { BoxDimensions } from '../../Types/BoxDimensions'
import { TreeNode } from '../TreeCreator'

export function getPartitionTreeLayout<TData>(
  rootHierarchyNode: HierarchyNode<TreeNode<TData>>,
  dimensions: BoxDimensions,
): HierarchyRectangularNode<TreeNode<TData>> {
  const partitionLayout: PartitionLayout<TreeNode<TData>> = partition<
    TreeNode<TData>
  >().size([dimensions.width, dimensions.height])
  return partitionLayout(rootHierarchyNode)
}
