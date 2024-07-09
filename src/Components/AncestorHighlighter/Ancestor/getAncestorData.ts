import { HierarchyNode } from "d3";

export default function getAncestorData<T>(hierarchyNode: HierarchyNode<T>): T[] {
    return hierarchyNode?.ancestors()?.map(x => x.data) ?? [];
}
