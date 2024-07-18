import { HierarchyNode } from 'd3'

import { SunburstItem, SunburstItemTreeNode } from '../../Models'
import { getHighlighter, Highlighter } from '../Highlighter'
import { TreeNode } from '../TreeCreator'
import { getAncestorElementListProvider } from './getAncestorElementListProvider'
import { GetHighlighterMethod } from './Types'

export const createSunburstHighlighter: GetHighlighterMethod<SunburstItem> = (
  gElementRef: React.MutableRefObject<SVGGElement | null>,
): Highlighter<HierarchyNode<TreeNode<SunburstItem>>> => {
  const provider = getAncestorElementListProvider(gElementRef)
  return getHighlighter<SunburstItemTreeNode>(provider)
}
