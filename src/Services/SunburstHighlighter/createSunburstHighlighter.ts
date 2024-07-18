import { HierarchyNode } from 'd3'

import { SunburstItem, SunburstItemTreeNode } from '../../Models'
import { getHighlighter, Highlighter } from '../Highlighter'
import { TreeNode } from '../TreeCreator'
import { getTreeNodeAncestorElementListProvider } from './getTreeNodeAncestorElementListProvider'
import { getArcElementProvider } from './getArcElementProvider'
import { GetHighlighterMethod } from './Types'

export const createSunburstHighlighter: GetHighlighterMethod<SunburstItem> = (
  gElementRef: React.MutableRefObject<SVGGElement | null>,
): Highlighter<HierarchyNode<TreeNode<SunburstItem>>> => {
  const arcElementProvider = getArcElementProvider(gElementRef)
  const elementProvider = getTreeNodeAncestorElementListProvider<
    SunburstItem,
    SVGGElement
  >(arcElementProvider)
  return getHighlighter<SunburstItemTreeNode>(elementProvider)
}
