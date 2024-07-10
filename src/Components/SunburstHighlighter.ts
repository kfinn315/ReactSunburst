import { HierarchyNode } from "d3";
import AncestorHighlighter, { IAncestorElementProvider, IAncestorHighlighter } from "./AncestorHighlighter/AncestorHighlighter";
import { SunburstItemTreeNode } from "./Types";
import AncestorElementProvider from "./AncestorHighlighter/AncestorElementProvider";

export function createSunburstHighlighter(gElementRef: React.MutableRefObject<SVGGElement | null>) {
  return new SunburstHighlighter(gElementRef);
}

export default class SunburstHighlighter implements IAncestorHighlighter<HierarchyNode<SunburstItemTreeNode>> {
  private ancestorHighlighter: IAncestorHighlighter<HierarchyNode<SunburstItemTreeNode>>

  clear() {
    this.ancestorHighlighter.clear()
  }

  highlight(item: HierarchyNode<SunburstItemTreeNode>) {
    this.ancestorHighlighter.highlight(item)
  }

  constructor(gElementRef: React.MutableRefObject<SVGGElement | null>) {
    const ancestorElementProvider: IAncestorElementProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> = new AncestorElementProvider(gElementRef);

    this.ancestorHighlighter = AncestorHighlighter<SunburstItemTreeNode>(ancestorElementProvider);
  }
}
