import { HierarchyNode } from 'd3';
import D3HierarchyPartitionLayout from '../Tree/PartitionLayout/D3HierarchyPartitionLayout';
import SunburstViewItemTN from './SunburstViewItemTN';

export default class SunburstViewItemPartitionLayout extends D3HierarchyPartitionLayout<SunburstViewItemTN> {

  constructor() {
    const getChildren: (d: SunburstViewItemTN) => SunburstViewItemTN[] = (d: SunburstViewItemTN) => d.children;
    const hierarchySumMethod: (d: SunburstViewItemTN) => number = (d: SunburstViewItemTN) => d.value ?? 0;
    const hierarchyNodeSort: (nodeA: HierarchyNode<SunburstViewItemTN>, nodeB: HierarchyNode<SunburstViewItemTN>) => number = (nodeA, nodeB) => {
      return nodeB.data.value - nodeA.data.value;
    };

    super(getChildren, hierarchySumMethod, hierarchyNodeSort);
  }
}
