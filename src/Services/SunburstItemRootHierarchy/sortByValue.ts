import { SunburstItem } from "../../Types";
import { TreeNode } from "../TreeCreator";
import { getValue } from './getValue';


export function sortByValue(
  nodeA: { data: TreeNode<SunburstItem> },
  nodeB: { data: TreeNode<SunburstItem> },
) {
  return getValue(nodeB.data) - getValue(nodeA.data);
}
