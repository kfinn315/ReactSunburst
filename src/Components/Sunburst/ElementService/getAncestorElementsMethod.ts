import { HierarchyNode } from "d3";
import getAncestorData from "../../../Shared/getAncestorData";

export default function getAncestorElementsMethod<T, E extends Element>(transformToElement: (item: T) => E | undefined): (hierarchyNode: HierarchyNode<T>) => E[] {
    return (hierarchyNode: HierarchyNode<T>): E[] => {
        return getAncestorData(hierarchyNode).map(transformToElement).filter(element => element != null) as E[]
    }
}
