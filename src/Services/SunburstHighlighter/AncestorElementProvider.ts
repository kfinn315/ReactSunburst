import { HierarchyNode } from 'd3'

import { SunburstItemTreeNode } from '../../Models/SunburstItemTreeNode'
import { ElementProvider, IElementProvider } from '../../Utils/ElementProvider'
import { getHierarchyNodeAncestorData } from '../../Utils/getAncestorData'
import { IElementsProvider } from '../Highlighter'
import { arcPathSelectorProvider } from './ArcPathSelectorProvider'
import { isNotNull } from './notNull'

export default class AncestorElementProvider
  implements
    IElementsProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement>
{
  private readonly arcPathElementProvider: IElementProvider<
    SunburstItemTreeNode,
    SVGPathElement
  >

  constructor(ref: React.MutableRefObject<SVGGElement | null>) {
    this.arcPathElementProvider = ElementProvider<
      SunburstItemTreeNode,
      SVGGElement,
      SVGPathElement
    >(ref, arcPathSelectorProvider)
  }

  getForItem(item: HierarchyNode<SunburstItemTreeNode>): SVGPathElement[] {
    return getHierarchyNodeAncestorData(item)
      .map((x) => this.arcPathElementProvider.get(x))
      .filter((x) => isNotNull(x)) as SVGPathElement[]
  }

  getAll(): SVGPathElement[] {
    return this.arcPathElementProvider.getAll()
  }
}
