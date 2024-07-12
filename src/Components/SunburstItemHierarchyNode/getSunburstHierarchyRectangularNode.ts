import { HierarchyNode, HierarchyRectangularNode } from 'd3';
import { SunburstItem, SunburstItemTreeNode } from '../Types';
import { TreePartitionLayout } from '../../PartitionLayout/TreePartitionLayout';
import BoxDimensions from '../../Shared/BoxDimensions';

function getSunburstItemNodeValue(d: SunburstItemTreeNode) {
  return d.data?.size ?? 0;
}

function sortSunburstItemByDataSize(nodeA: HierarchyNode<SunburstItemTreeNode>, nodeB: HierarchyNode<SunburstItemTreeNode>) {
  return (nodeB.data.data?.size ?? 0) - (nodeA.data.data?.size ?? 0);
}

export function getSunburstHierarchyRectangularNode(root: SunburstItemTreeNode, dimensions: BoxDimensions): HierarchyRectangularNode<SunburstItemTreeNode> {
  return TreePartitionLayout<SunburstItem>(root, dimensions, getSunburstItemNodeValue, sortSunburstItemByDataSize);
}