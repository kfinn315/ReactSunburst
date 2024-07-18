import { addSegmentToTreeNodeRecursively } from './addSegmentToTreeNodeRecursively';
import { idGenerator } from './idGenerator';
import { SegmentNode, TreeNode } from './Types';

/**
 * Create a tree data structure by adding SegmentNode items to a root node
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */
export default function createTree<TData>(items: SegmentNode<TData>[]): TreeNode<TData> {
    const myIDGenerator = idGenerator();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = myIDGenerator.next().value!;

    const root: TreeNode<TData> = { id, name: "root", children: [] };
    items.forEach(item => {
        const segmentIterator = item.segments.values();
        const data = item.data;

        addSegmentToTreeNodeRecursively({ idGenerator: myIDGenerator, data, segmentIterator, treeNode: root });
    });

    return root;
}
