import { HierarchyNode } from 'd3';

import CollectionClassModifier from '../../Utils/CSSClassModifier/CollectionClassModifier';
import { Highlighter, IElementsProvider } from './Types';

/**
 * Adds the "highlight" class to the html elements given by the elementProvider
 * @param elementProvider 
 * @returns IAncestorHighlighter object
 */
export default function getHighlighter<TDatum, E extends Element = Element>(elementProvider: IElementsProvider<HierarchyNode<TDatum>, E>): Highlighter<HierarchyNode<TDatum>> {
  const highlighter = new CollectionClassModifier("highlight");

  return {
    clear: () => { highlighter.remove(elementProvider.getAll()) },
    highlight: (hierarchyNode: HierarchyNode<TDatum>) => {
      const pathElements = elementProvider.getForItem(hierarchyNode);
      highlighter.add(pathElements)
    }
  };
}
