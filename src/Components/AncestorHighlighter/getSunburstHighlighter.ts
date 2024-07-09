import { HierarchyNode } from "d3";
import ElementProvider from '../../Shared/ElementProvider/ElementProvider';
import AncestorHighlighter, { IAncestorElementProvider } from "./AncestorHighlighter";
import { SunburstItem, SunburstItemTreeNode } from "../Types";
import getAncestorElementsMethod from "./Ancestor/getAncestorElementsMethod";
import getArcPathSelector from "./getArcPathSelector";

export default function getSunburstHighlighter(gElementRef: React.MutableRefObject<SVGGElement | null>) {
  const arcPathElementProvider = ElementProvider<SunburstItemTreeNode, SVGGElement, SVGPathElement>(gElementRef, getArcPathSelector<SunburstItem>);
  const ancestorElementMethod = getAncestorElementsMethod(arcPathElementProvider.forItem);

  const ancestorElementProvider: IAncestorElementProvider<HierarchyNode<SunburstItemTreeNode>, SVGPathElement> = {
    forItem: (item: HierarchyNode<SunburstItemTreeNode>) => {
      return ancestorElementMethod(item);
    },
    getAll: arcPathElementProvider.getAll
  };

  return AncestorHighlighter<SunburstItemTreeNode>(ancestorElementProvider);
}
