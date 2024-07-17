import { TreeNode } from "../Tree";

export default function ArcPathSelectorProvider<TData extends { id: unknown }>(item?: TreeNode<TData>): string {
  if (item) {
    return `.arc>path[data-id="${String(item.id)}"]`;
  }

  return '.arc>path'; //select all paths
}
