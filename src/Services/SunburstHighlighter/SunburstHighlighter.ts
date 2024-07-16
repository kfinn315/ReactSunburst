import { HierarchyNode } from "d3";
import { SunburstItemTreeNode } from '../../Models/SunburstItemTreeNode';
import AncestorElementProvider from "./AncestorElementProvider";
import { type Highlighter, type IElementsProvider, BasicHighlighter } from "../Highlighter";

export function createSunburstHighlighter(gElementRef: React.MutableRefObject<SVGGElement | null>) {
  return new SunburstHighlighter(gElementRef);
}

export default class SunburstHighlighter implements Highlighter<HierarchyNode<SunburstItemTreeNode>> {
  private ancestorHighlighter: Highlighter<HierarchyNode<SunburstItemTreeNode>>

  clear() {
    this.ancestorHighlighter.clear()
  }

  highlight(item: HierarchyNode<SunburstItemTreeNode>) {
    this.ancestorHighlighter.highlight(item)
  }

  constructor(gElementRef: React.MutableRefObject<SVGGElement | null>) {
    const ancestorElementProvider: IElementsProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> = new AncestorElementProvider(gElementRef);

    this.ancestorHighlighter = BasicHighlighter<SunburstItemTreeNode>(ancestorElementProvider);
  }
}
