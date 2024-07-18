import { HierarchyNode } from 'd3'

import CollectionClassModifier from '../../Utils/CSSClassModifier/CollectionClassModifier'
import { Highlighter, ElementListProvider } from './Types'

/**
 * Adds the "highlight" class to the html elements given by the elementProvider
 * @param elementProvider
 * @returns IAncestorHighlighter object
 */
export default function getHighlighter<
  TDatum,
  TElement extends Element = Element,
>(
  elementProvider: ElementListProvider<HierarchyNode<TDatum>, TElement>,
): Highlighter<HierarchyNode<TDatum>> {
  const highlighter = new CollectionClassModifier('highlight')

  return {
    clear: () => {
      highlighter.remove(elementProvider.getAll())
    },
    highlight: (hierarchyNode: HierarchyNode<TDatum>) => {
      const pathElements = elementProvider.get(hierarchyNode)
      highlighter.add(pathElements)
    },
  }
}
