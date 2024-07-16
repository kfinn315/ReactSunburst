import { HierarchyNode } from "d3";

export default function getAncestorData<TDatum>(hierarchyNode: HierarchyNode<TDatum>): TDatum[] | undefined {
  return hierarchyNode.ancestors().map(x => x.data);
}
