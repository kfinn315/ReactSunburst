import { HierarchyNode } from "d3";
import ElementProvider, { IElementProvider } from "../../Shared/ElementProvider/ElementProvider";
import { SunburstItemTreeNode, SunburstItem } from "../../Models";
import ArcPathSelectorProvider from "./ArcPathSelectorProvider";
import getAncestorData from "../../Shared/getAncestorData";
import { IElementsProvider } from "../Highlighter";


export default class AncestorElementProvider implements IElementsProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> {
  private readonly arcPathElementProvider: IElementProvider<SunburstItemTreeNode, SVGPathElement>;

  constructor(ref: React.MutableRefObject<SVGGElement | null>) {
    this.arcPathElementProvider = ElementProvider<SunburstItemTreeNode, SVGGElement, SVGPathElement>(ref, ArcPathSelectorProvider<SunburstItem>);
  }

  forItem(item: HierarchyNode<SunburstItemTreeNode>): SVGPathElement[] {
    return (getAncestorData(item) ?? []).map(this.arcPathElementProvider.forItem).filter(element => element != null) as SVGPathElement[]
  }

  getAll(): SVGPathElement[] {
    return this.arcPathElementProvider.getAll();
  }

}
