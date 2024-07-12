import { HierarchyNode } from 'd3';
import CollectionClassModifier from '../Shared/CSSClassModifier/CollectionClassModifier';
import { IElementsProvider, Highlighter } from './Types';

/**
 * Highlighter that adds the "highlight" class to the html elements given by the elementProvider
 * @param elementProvider 
 * @returns IAncestorHighlighter object
 */
export default function BasicHighlighter<T, E extends Element = Element>(elementProvider: IElementsProvider<HierarchyNode<T>, E>): Highlighter<HierarchyNode<T>> {
  const highlighter = new CollectionClassModifier("highlight");

  return {
    clear: () => { highlighter.remove(elementProvider.getAll()) },
    highlight: (hierarchyNode: HierarchyNode<T>) => {
      const pathElements = elementProvider.forItem(hierarchyNode);
      highlighter.add(pathElements)
    }
  };
}
