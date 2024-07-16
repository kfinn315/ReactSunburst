import { TreeNode } from "../Tree";

export default function ArcPathSelectorProvider<TData extends { id: unknown }>(item?: TreeNode<TData>): string {
  let selector: string;
  if (!item) { //select all paths
    selector = '.arc>path';
  }
  else {
    selector = `.arc>path[data-id="${String(item.id)}"]`;
  }
  return selector;
}
