import { HierarchyNode } from "d3";

function getAncestors<T>(hierarchyNode: HierarchyNode<T>): T[] {
    function getNodeData(node: HierarchyNode<T>): T {
        return node.data;
    }

    function getAncestorNodes(hierarchyNode: HierarchyNode<T>): HierarchyNode<T>[] {
        if (hierarchyNode != null) {
            return hierarchyNode.ancestors();
        }
        return [];
    }
    const ancestors = getAncestorNodes(hierarchyNode);
    return ancestors.map(x => getNodeData(x));
}

export default function getAncestorPaths<T, E>(getPathForNode: (item: T) => E | undefined, hierarchyNode: HierarchyNode<T>): E[] {
    function getPathElements(items: T[]): E[] {
        return items.map(getPathForNode).filter(path => path != null) as E[];
    }

    const ancestorData = getAncestors(hierarchyNode);
    return getPathElements(ancestorData);
}
