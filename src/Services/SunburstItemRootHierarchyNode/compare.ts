import { SunburstItem } from "../../Types";
import { TreeNode } from "../TreeCreator";
import { getValue } from './getValue';

export function compare(
  nodeA: { data: TreeNode<SunburstItem> },
  nodeB: { data: TreeNode<SunburstItem> },
) {
  return getValue(nodeB.data) - getValue(nodeA.data);
}
