import { HierarchyRectangularNode } from 'd3';
import IPartitionLayout from './PartitionLayout/IPartitionLayout';
import { TreeNode } from './Types';
import Dimensions from '../Shared/Dimensions';


interface Props<T> {
  dimensions: Dimensions,
  rootTreeNode: TreeNode<T>
  partitionLayout: IPartitionLayout<T>
}

export default function getHierarchyNodes<T>(props: Props<T>): Array<HierarchyRectangularNode<TreeNode<T>>> {
  const { rootTreeNode, dimensions, partitionLayout } = props;

  return partitionLayout.getLayout(rootTreeNode, dimensions);
}
