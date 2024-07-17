import { HierarchyNode } from "d3";
import { ElementProvider, IElementProvider } from "../../Utils/ElementProvider";
import { SunburstItemTreeNode } from '../../Models/SunburstItemTreeNode';
import { SunburstItem } from '../../Models/SunburstItem';
import ArcPathSelectorProvider from "./ArcPathSelectorProvider";
import { getHierarchyNodeAncestorData } from "../../Utils/getAncestorData";
import { IElementsProvider } from "../Highlighter";


export default class AncestorElementProvider implements IElementsProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> {
  private readonly arcPathElementProvider: IElementProvider<SunburstItemTreeNode, SVGPathElement>;

  constructor(ref: React.MutableRefObject<SVGGElement | null>) {
    this.arcPathElementProvider = ElementProvider<SunburstItemTreeNode, SVGGElement, SVGPathElement>(ref, ArcPathSelectorProvider<SunburstItem>);
  }

  getForItem(item: HierarchyNode<SunburstItemTreeNode>): SVGPathElement[] {
    const NotNull = (element: SVGPathElement | null): boolean => element != null;
    return getHierarchyNodeAncestorData(item).map(x => this.arcPathElementProvider.forItem(x)).filter(NotNull) as SVGPathElement[]
  }

  getAll(): SVGPathElement[] {
    return this.arcPathElementProvider.getAll();
  }
}
