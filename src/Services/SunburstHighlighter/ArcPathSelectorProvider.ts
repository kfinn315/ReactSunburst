import { SunburstItemTreeNode } from "../../Models";
import { SelectorProvider } from "../../Utils/ElementProvider";

export const arcPathSelectorProvider: SelectorProvider<SunburstItemTreeNode> = {
  forAll: () => '.arc>path', //select all paths
  forItem: (item) => `.arc>path[data-id="${String(item.id)}"]`
}