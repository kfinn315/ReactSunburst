// import { HierarchyNode } from "d3";
// import SVGElementService from "./SVGElementService";

// /**
//  * Methods to retrieve SVGPathElement representations of Modules
//  */
// export default class SVGPathElementService<T, E extends Element = Element> implements SVGElementService<T, E> {
//     constructor(
//         private readonly getPathForNode: (item: T) => E | undefined,
//         private readonly getAllPaths: () => E[],
//     ) { }

//     getAll(): E[] {

//         return this.getAllPaths()
//     }

//     getAncestorPaths(hierarchyNode: HierarchyNode<T>): E[] {

//         function getNodeData(node: HierarchyNode<T>): T {
//             return node.data;
//         }

//         function getAncestorNodes(hierarchyNode: HierarchyNode<T>): HierarchyNode<T>[] {
//             if (hierarchyNode != null) {
//                 return hierarchyNode.ancestors();
//             }
//             return [];
//         }

//         function getPathElements(items: T[]): E[] {
//             return items.map(this.getPathForNode).filter(path => path != null) as E[];
//         }

//         const ancestors = getAncestorNodes(hierarchyNode)
//         const ancestorData = ancestors.map(x => getNodeData(x))
//         const pathElements = getPathElements(ancestorData);
//         return pathElements;
//     }

// }
