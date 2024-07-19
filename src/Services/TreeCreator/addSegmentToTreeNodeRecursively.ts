import { Nodey } from './Nodey'

interface Props<TNode> {
  idGenerator: Generator<number, void>
  segmentIterator: IterableIterator<string>
  node: Nodey<TNode>
  data: TNode
}

export function addSegmentToTreeNodeRecursively<TNode>({
  idGenerator,
  segmentIterator,
  node,
  data,
}: Props<TNode>) {
  if (node === null) {
    throw Error('node is null')
  }

  const nextSegment = segmentIterator.next()

  if (nextSegment.done) {
    //end of segments, set segment.data to node.data and end recursion by returningF
    node.data = data
  } else {
    const nextSegmentName = nextSegment.value

    let childNode = node.getChild(nextSegmentName)

    if (childNode === undefined) {
      //create new node and add to children
      const nextID = idGenerator.next()

      if (nextID.done) {
        throw Error('idGenerator should never be done')
      }

      childNode = new Nodey<TNode>(nextID.value, nextSegmentName)
      node.addChild(childNode)
      // addNodeToChildren(node, childNode)
    }

    addSegmentToTreeNodeRecursively({
      idGenerator,
      segmentIterator,
      node: childNode,
      data,
    })
  }
}
