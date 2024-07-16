import { TreeNode } from './Types';

function findNode<T>(children: TreeNode<T>[], name: string | null): TreeNode<T> | undefined {
    return children.find(x => x.name === name)
}

export function addSegmentToTreeNodeRecursively<T>(nextID: number, treeNode: TreeNode<T> | null, iterator: IterableIterator<string>, data: T): number {
    let id = nextID
    if (treeNode === null) {
        throw Error("treeNode is null")
    }

    const { value: nextSegmentName } = iterator.next() as { value: string | null };

    //end of segments, set segment.data to node.data and end recursion by returning
    if (!nextSegmentName) {
        treeNode.data = data;
        return id;
    }

    let childNode = findNode(treeNode.children, nextSegmentName);

    if (childNode === undefined) {
        //create new node and add to children
        childNode = { id, name: nextSegmentName, children: [] }
        id++;
        treeNode.children.push(childNode)
    }


    return addSegmentToTreeNodeRecursively(id, childNode, iterator, data)
}
