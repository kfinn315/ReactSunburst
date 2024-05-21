import { HierarchyNode } from 'd3';
import SunburstViewItem from "../../Models/SunburstViewItem";
import getAncestorElementsMethod from './ElementService/getAncestorElementsMethod';
import Highlighter from '../Highlighter/Highlighter';
import IGetElements from '../../Shared/GetElements/IGetElements';

export interface IAncestorHighlighter<T> {
  reset: () => void;
  highlight: (item: T) => void;
}

export default function getAncestorHighlighter<T extends SunburstViewItem>(
  getElementMethods: IGetElements<T, SVGPathElement>
): IAncestorHighlighter<HierarchyNode<T>> {
  const highlighter = new Highlighter();
  const getAncestorPathsMethod = getAncestorElementsMethod<T, SVGPathElement>(getElementMethods.forItem)

  return {
    reset: () => { highlighter.remove(getElementMethods.getAll()) },
    highlight: (node: HierarchyNode<T>) => { highlighter.add(getAncestorPathsMethod(node)) }
  };
}
