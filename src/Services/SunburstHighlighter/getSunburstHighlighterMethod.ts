import { HierarchyNode } from 'd3'

import { SunburstItem, SunburstItemTreeNode } from '../../Types'
import { getHighlighter, Highlighter } from '../Highlighter'
import { TreeNode } from '../TreeCreator'
import { getAncestorElementListProvider } from './getAncestorElementListProvider'
import { getArcElementProvider } from './getArcElementProvider'
import { GetHighlighterMethod } from './Types'

export const getSunburstHighlighterMethod: GetHighlighterMethod<SunburstItem> = (
  gElementRef: React.MutableRefObject<SVGGElement | null>,
): Highlighter<HierarchyNode<TreeNode<SunburstItem>>> => {
  const arcElementProvider = getArcElementProvider(gElementRef)

  const elementProvider = getAncestorElementListProvider<
    TreeNode<SunburstItem>,
    SVGGElement
  >(arcElementProvider)

  return getHighlighter<SunburstItemTreeNode>(elementProvider)
}
