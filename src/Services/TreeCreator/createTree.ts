import { addSegmentToTreeNodeRecursively } from './addSegmentToTreeNodeRecursively'
import { Nodey } from './Nodey'
import { getIDGenerator } from './getIDGenerator'
import { SegmentNode, TreeNode } from './Types'

/**
 * Create a tree data structure by adding SegmentNode items to a root node
 * @param items Items with segment information to build the tree with
 * @returns Root node of the tree
 */
export default function createTree<TData>(
  items: SegmentNode<TData>[],
): TreeNode<TData> {
  const myIDGenerator = getIDGenerator()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = myIDGenerator.next().value!
  const rootNode = new Nodey<TData>(id, 'root')

  items.forEach((item) => {
    const segmentIterator = item.segments.values()
    const data = item.data

    addSegmentToTreeNodeRecursively({
      idGenerator: myIDGenerator,
      segmentIterator,
      data,
      node: rootNode,
    })
  })

  return rootNode
}
