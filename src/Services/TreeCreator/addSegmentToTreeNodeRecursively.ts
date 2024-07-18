import { findNode } from './findNode'
import { TreeNode } from './Types'

interface Props<TNode> {
  idGenerator: Generator<number, void>
  treeNode: TreeNode<TNode> | null
  segmentIterator: IterableIterator<string>
  data: TNode
}

export function addSegmentToTreeNodeRecursively<TNode>({
  idGenerator,
  treeNode,
  segmentIterator,
  data,
}: Props<TNode>) {
  if (treeNode === null) {
    throw Error('treeNode is null')
  }

  const nextSegment = segmentIterator.next()

  if (nextSegment.done) {
    //end of segments, set segment.data to node.data and end recursion by returningF
    treeNode.data = data
  } else {
    const nextSegmentName = nextSegment.value

    let childNode = findNode(treeNode.children, nextSegmentName)

    if (childNode === undefined) {
      //create new node and add to children
      const nextID = idGenerator.next()

      if (nextID.done) {
        throw Error('idGenerator should never be done')
      }

      childNode = { id: nextID.value, name: nextSegmentName, children: [] }
      treeNode.children.push(childNode)
    }

    addSegmentToTreeNodeRecursively({
      idGenerator,
      treeNode: childNode,
      segmentIterator,
      data,
    })
  }
}
