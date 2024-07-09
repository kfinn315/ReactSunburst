import { HierarchyNode } from 'd3';
import D3HierarchyPartitionLayout from '../../../PartitionLayout/D3HierarchyPartitionLayout';
import { SunburstItem, SunburstItemTreeNode } from '../../Types';

export default class SunburstItemPartitionLayout extends D3HierarchyPartitionLayout<SunburstItem> {
  constructor() {
    super(getChildren, hierarchySumMethod, hierarchyNodeSort);
  }
}

function getChildren(d: SunburstItemTreeNode) { return d.children; }

function hierarchySumMethod(d: SunburstItemTreeNode) { return d.data?.size ?? 0; }

function hierarchyNodeSort(nodeA: HierarchyNode<SunburstItemTreeNode>, nodeB: HierarchyNode<SunburstItemTreeNode>) {
  return (nodeB.data.data?.size ?? 0) - (nodeA.data.data?.size ?? 0);
}
