import { HierarchyNode } from 'd3';
import CollectionClassModifier from '../../Shared/CSSClassModifier/CollectionClassModifier';

export interface IAncestorHighlighter<T> {
  clear: () => void;
  highlight: (item: T) => void;
}

export interface IAncestorElementProvider<T, E extends Element = Element> {
  forItem: (item: T) => E[];
  getAll: () => E[];
}

/**
 * Highlighter that adds the "highlight" class to the html elements given by the elementProvider
 * @param elementProvider 
 * @returns IAncestorHighlighter object
 */
export default function AncestorHighlighter<T>(elementProvider: IAncestorElementProvider<HierarchyNode<T>, SVGPathElement>): IAncestorHighlighter<HierarchyNode<T>> {
  const highlighter = new CollectionClassModifier("highlight");

  return {
    clear: () => { highlighter.remove(elementProvider.getAll()) },
    highlight: (hierarchyNode: HierarchyNode<T>) => {
      const pathElements = elementProvider.forItem(hierarchyNode);
      highlighter.add(pathElements)
    }
  };
}
