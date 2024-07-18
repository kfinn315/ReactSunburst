import { HierarchyNode } from 'd3'

import { SunburstItemTreeNode } from '../../Models/SunburstItemTreeNode'
import { getHierarchyNodeAncestorData } from '../../Utils/getAncestorData'
import { ElementListProvider } from '../Highlighter'
import { getArcElementProvider } from './getArcElementProvider'
import { isNotNull } from '../../Utils/isNotNull'

export function getAncestorElementListProvider(
  ref: React.MutableRefObject<SVGGElement | null>,
): ElementListProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> {
  const arcElementProvider = getArcElementProvider(ref)

  return {
    get(item: HierarchyNode<SunburstItemTreeNode>): SVGPathElement[] {
      return getHierarchyNodeAncestorData(item)
        .map((x) => arcElementProvider.get(x))
        .filter((x) => isNotNull(x)) as SVGPathElement[]
    },
    getAll(): SVGPathElement[] {
      return arcElementProvider.getAll()
    },
  }
}
