import { TreeNode } from './Types';

function findNode<TData>(children: TreeNode<TData>[], name: string | null): TreeNode<TData> | undefined {
    return children.find(x => x.name === name)
}

export function addSegmentToTreeNodeRecursively<TNode>(nextID: number, treeNode: TreeNode<TNode> | null, iterator: IterableIterator<string>, data: TNode): number {
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
