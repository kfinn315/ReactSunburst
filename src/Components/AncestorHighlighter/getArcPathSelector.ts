import { TreeNode } from "../../Tree/Types";

export default function getArcPathSelector<T extends { id: unknown }>(item?: TreeNode<T>): string {
  let selector: string;
  if (item === undefined) { //select all paths
    selector = '.arc>path';
  }
  else if (item.name === "root") {
    selector = `.arc>path[data-name="root"]`;
  }
  else if (item.data !== undefined) {
    selector = `.arc>path[data-id="${item.data.id}"]`;
  }
  else selector = "";

  return selector;
}
