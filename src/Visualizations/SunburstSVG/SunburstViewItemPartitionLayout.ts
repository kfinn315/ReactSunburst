import { HierarchyNode } from 'd3';
import PartitionLayout0 from '../Sunburst/Data/PartitionLayout/PartitionLayout';
import { SunburstViewItemTN } from './SunburstSVG';

export default class SunburstViewItemPartitionLayout extends PartitionLayout0<SunburstViewItemTN> {

  constructor() {
    const getChildren: (d: SunburstViewItemTN) => SunburstViewItemTN[] = (d: SunburstViewItemTN) => d.children;
    const hierarchySumMethod: (d: SunburstViewItemTN) => number = (d: SunburstViewItemTN) => d.value ?? 0;
    const hierarchyNodeSort: (nodeA: HierarchyNode<SunburstViewItemTN>, nodeB: HierarchyNode<SunburstViewItemTN>) => number = (nodeA, nodeB) => {
      return nodeB.data.value - nodeA.data.value;
    };

    super(getChildren, hierarchySumMethod, hierarchyNodeSort);
  }
}
