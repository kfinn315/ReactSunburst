import { HierarchyNode } from "d3";
import ElementProvider from "../../Shared/ElementProvider/ElementProvider";
import { SunburstItemTreeNode, SunburstItem } from "../Types";
import { IAncestorElementProvider } from "./AncestorHighlighter";
import getArcPathSelector from "./getArcPathSelector";
import getAncestorData from "../../Shared/getAncestorData";


export default class AncestorElementProvider implements IAncestorElementProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> {
  private readonly arcPathElementProvider;

  forItem(item: HierarchyNode<SunburstItemTreeNode>): SVGPathElement[] {
    return (getAncestorData(item) ?? []).map(this.arcPathElementProvider.forItem).filter(element => element != null)
  }

  getAll(): SVGPathElement[] {
    return this.arcPathElementProvider.getAll();
  }

  constructor(ref: React.MutableRefObject<SVGGElement | null>) {
    this.arcPathElementProvider = ElementProvider<SunburstItemTreeNode, SVGGElement, SVGPathElement>(ref, getArcPathSelector<SunburstItem>);
  }
}
