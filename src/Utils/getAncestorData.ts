import { HierarchyNode } from 'd3'

export function getHierarchyNodeAncestorData<TDatum>(
  hierarchyNode: HierarchyNode<TDatum>,
): TDatum[] {
  return hierarchyNode.ancestors().map((x) => x.data)
}
