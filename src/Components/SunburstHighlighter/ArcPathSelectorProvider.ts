import { TreeNode } from "../../Tree/Types";

export default function ArcPathSelectorProvider<T extends { id: unknown }>(item?: TreeNode<T>): string {
  let selector: string;
  if (item === undefined) { //select all paths
    selector = '.arc>path';
  }
  else if (item.id !== undefined) {
    selector = `.arc>path[data-id="${item.id}"]`;
  }
  else selector = "";

  return selector;
}
