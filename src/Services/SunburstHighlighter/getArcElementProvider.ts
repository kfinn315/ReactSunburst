import { SunburstItemTreeNode } from '../../Types'
import { getElementProvider } from '../../Utils/ElementProvider/getElementProvider'
import { arcSelectorProvider } from './arcSelectorProvider'

export function getArcElementProvider(
  ref: React.MutableRefObject<SVGGElement | null>,
) {
  const selectors = arcSelectorProvider

  const arcElementProvider = getElementProvider<SunburstItemTreeNode, SVGGElement, SVGPathElement>(ref, selectors)

  return arcElementProvider
}
