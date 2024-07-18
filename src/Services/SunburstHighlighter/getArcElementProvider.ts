import { SunburstItemTreeNode } from '../../Models'
import { getElementProvider } from '../../Utils/ElementProvider/ElementProvider'
import { arcSelectorProvider } from './arcSelectorProvider'

export function getArcElementProvider(
  ref: React.MutableRefObject<SVGGElement | null>,
) {
  const selectorProvider = arcSelectorProvider

  const arcElementProvider = getElementProvider<
    SunburstItemTreeNode,
    SVGGElement,
    SVGPathElement
  >(ref, selectorProvider)
  return arcElementProvider
}
