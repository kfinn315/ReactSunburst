import { HierarchyNode } from "d3";
import ElementProvider from '../../Shared/ElementProvider/ElementProvider';
import { TreeNode } from "../../Tree/Types";
import AncestorHighlighter, { IAncestorElementProvider } from "./AncestorHighlighter";
import { SunburstItem } from "../Types";
import getAncestorElementsMethod from "./Ancestor/getAncestorElementsMethod";
import getArcPathSelector from "./getArcPathSelector";

export default function getSunburstHighlighter(gElementRef: React.MutableRefObject<SVGGElement | null>) {
  const arcPathElementProvider = ElementProvider<TreeNode<SunburstItem>, SVGGElement, SVGPathElement>(gElementRef, getArcPathSelector<SunburstItem>);
  const ancestorElementMethod = getAncestorElementsMethod(arcPathElementProvider.forItem);

  const ancestorElementProvider: IAncestorElementProvider<HierarchyNode<TreeNode<SunburstItem>>> = {
    forItem: (item: HierarchyNode<TreeNode<SunburstItem>>) => {
      return ancestorElementMethod(item);
    },
    getAll: arcPathElementProvider.getAll
  };

  return AncestorHighlighter<TreeNode<SunburstItem>>(ancestorElementProvider);
}
