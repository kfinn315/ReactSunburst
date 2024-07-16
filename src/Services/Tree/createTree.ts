import { addSegmentToTreeNodeRecursively } from "./Tree";
import { SegmentNode, TreeNode } from "./Types";

/**
 * Create a tree data structure by adding SegmentNode items to a root node
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */

export default function createTree<T>(items: SegmentNode<T>[]): TreeNode<T> {
    let id = 0;

    const rootNode: TreeNode<T> = { id, name: "root", children: [] };
    items.forEach(item => {
        const iterator = item.segments.values();
        const data = item.data;
        id = addSegmentToTreeNodeRecursively(++id, rootNode, iterator, data);
        id++;
    });

    return rootNode;
}
