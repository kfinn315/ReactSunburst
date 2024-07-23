import { HierarchyNode } from 'd3'

import { IElementProvider } from '../../Utils/ElementProvider'
import { getHierarchyNodeAncestors } from '../../Utils/getHierarchyNodeAncestors'
import { isNotNull } from '../../Utils/isNotNull'
import { ElementListProvider } from '../Highlighter'

function getAncestorNodeData<T>(hierarchyNode: HierarchyNode<T>) {
  return getHierarchyNodeAncestors(hierarchyNode).map(hierarchyNode => hierarchyNode.data)
}

function getElements<Datum, TElement extends Element>(provider: IElementProvider<Datum, TElement>, items: Datum[]): TElement[] {
  return items
    .map((item) => provider.get(item))
    .filter((element) => isNotNull(element)) as TElement[]
}

export function getAncestorElementListProvider<
  TDatum,
  TElement extends Element = Element,
>(
  elementProvider: IElementProvider<TDatum, TElement>,
): ElementListProvider<HierarchyNode<TDatum>, TElement> {


  return {
    get(hierarchyNode: HierarchyNode<TDatum>): TElement[] {
      const ancestors = getAncestorNodeData(hierarchyNode)

      return getElements(elementProvider, ancestors)
    },
    getAll(): TElement[] {
      return elementProvider.getAll()
    },
  }
}
