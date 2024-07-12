import { SegmentNode, TreeNode } from './Types';

/**
 * 
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */
export default function createTree<T>(items: SegmentNode<T>[]): TreeNode<T> {
    let id = 0;

    const rootNode: TreeNode<T> = { id, name: "root", children: [] };
    items.forEach(item => {
        const iterator = item.segments.values()
        const data = item.data
        id++
        id = addSegmentToTreeNodeRecursively(id, rootNode, iterator, data)
    })

    return rootNode
}


function findNode(children: TreeNode<T>[], name: string): TreeNode<T> | undefined {
    return children.find(x => x.name === name)
}

function addSegmentToTreeNodeRecursively(nextID: number, treeNode: TreeNode<T>, iterator: IterableIterator<string>, data: T): number {
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
