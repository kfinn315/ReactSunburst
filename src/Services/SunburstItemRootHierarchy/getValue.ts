import { SunburstItem } from "../../Types";
import { TreeNode } from "../TreeCreator";


export function getValue(d: TreeNode<SunburstItem>): number {
  return d.data?.size ?? 0;
}
