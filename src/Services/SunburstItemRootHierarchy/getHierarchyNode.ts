import { HierarchyNode } from 'd3'

import { SunburstItem } from '../../Types'
import { TreeNode } from '../TreeCreator'
import { getTreeNodeHierarchy } from './getTreeNodeHierarchy'
import { sortByValue } from './sortByValue'
import { getValue } from './getValue'

export function getHierarchyNode(
  root: TreeNode<SunburstItem>,
): HierarchyNode<TreeNode<SunburstItem>> {
  return getTreeNodeHierarchy(root).sum(getValue).sort(sortByValue)
}
