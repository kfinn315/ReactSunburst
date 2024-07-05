import { HierarchyNode } from 'd3';
import getAncestorElementsMethod from '../../Shared/Ancestor/getAncestorElementsMethod';
import Highlighter from './Highlighter';
import { IElementProvider } from '../../Shared/ElementProvider/ElementProvider';

export interface IAncestorHighlighter<T> {
  reset: () => void;
  highlight: (item: T) => void;
}

export default function AncestorHighlighter<T>(
  getElementMethods: IElementProvider<T, SVGPathElement>
): IAncestorHighlighter<HierarchyNode<T>> {
  const highlighter = new Highlighter();
  const getAncestorPathsMethod = getAncestorElementsMethod<T, SVGPathElement>(getElementMethods.forItem)

  return {
    reset: () => { highlighter.remove(getElementMethods.getAll()) },
    highlight: (node: HierarchyNode<T>) => { highlighter.add(getAncestorPathsMethod(node)) }
  };
}
