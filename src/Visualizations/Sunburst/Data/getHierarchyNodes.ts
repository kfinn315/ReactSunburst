import { HierarchyRectangularNode } from 'd3';
import { Dimensions } from '../../D3Types';
import Tree from "./Tree";
import SegmentNode from "./Models/SegmentNode";
import { IPartitionLayout } from './PartitionLayout/PartitionLayout';
import TreeNode from './Models/TreeNode';
import UndefinedArgumentError from '../../UndefinedArgumentError';


function createTree<T>(items: SegmentNode<T>[]): Tree<T> {
  const tree = new Tree<T>("root", undefined);
  tree.addNodes(items);
  return tree;
}

interface Props<T> {
  dimensions: Dimensions,
  items: SegmentNode<T>[],
  partitionLayout: IPartitionLayout<T>
}

export default function getHierarchyNodes<T>(props: Props<T>): Array<HierarchyRectangularNode<TreeNode<T>>> {
  const { items, dimensions, partitionLayout } = props;

  if (items == null) {
    throw new UndefinedArgumentError("items");
  }

  const tree = createTree(items);

  return partitionLayout.getLayout(tree.rootNode, dimensions);
}
