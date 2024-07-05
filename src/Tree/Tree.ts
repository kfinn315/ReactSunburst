import { SegmentNode, TreeNode } from './Types';

type Segment<T> = {
    iterator: IterableIterator<string>;
    // segment: string;
    name: string
    data: T
    done: boolean;
}

/**
 * 
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */
export default function createTree<T>(items: SegmentNode<T>[]): TreeNode<T> {
    const rootNode: TreeNode<T> = { name: "root", children: [] };
    const segments: Segment<T>[] = items.map(item => {
        return { data: item.data, done: false, iterator: item.segments.values(), name: "root" }
    })
    segments.forEach(item => {
        addSegmentToTree(rootNode, item)
    })
    return rootNode

    function addSegmentToTree(treeNode: TreeNode<T>, segment: Segment<T>) {
        const { name, done, data } = getNextSegment(segment);

        if (done) {
            treeNode.data = data;
            return;
        }

        if (treeNode === undefined) {
            throw Error("should not have undefined tree node")
        }

        let nextNode: TreeNode<T> | undefined = findNode(treeNode.children, name);

        if (nextNode === undefined) {
            //create new node and add to treeNode.children
            nextNode = { children: [], name }
            treeNode.children.push(nextNode)
        }
        addSegmentToTree(nextNode, segment)
    }

    function getNextSegment(segment: Segment<T>): Segment<T> {
        if (segment === undefined) {
            throw Error("segment should not be undefined")
        }

        const { value: name } = segment.iterator.next()

        return { iterator: segment.iterator, data: segment.data, name, done: name == undefined }
    }

    function findNode(children: TreeNode<T>[], name: string): TreeNode<T> | undefined {
        return children.find(x => x.name === name)
    }
}