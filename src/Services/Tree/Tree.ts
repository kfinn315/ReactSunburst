import { TreeNode } from './Types';

function findNode<T>(children: TreeNode<T>[], name: string): TreeNode<T> | undefined {
    return children.find(x => x.name === name)
}

export function addSegmentToTreeNodeRecursively<T>(nextID: number, treeNode: TreeNode<T>, iterator: IterableIterator<string>, data: T): number {
    let id = nextID
    if (treeNode === undefined) {
        throw Error("treeNode is undefined")
    }

    const { value: nextSegmentName } = iterator.next();

    //end of segments, set segment.data to node.data and end recursion by returning
    if (nextSegmentName == undefined) {
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
