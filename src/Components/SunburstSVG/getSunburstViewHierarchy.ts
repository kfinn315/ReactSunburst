import { SunburstItem } from "../Types";
import SunburstItemPartitionLayout from './SunburstItemPartitionLayout';
import Dimensions from '../../Shared/Dimensions';
import getHierarchyNodes from "../../Tree/getHierarchyNodes";
import SunburstItemTreeNode from "./SunburstItemTreeNode";

export default function getSunburstViewHierarchy(
  rootTreeNode: SunburstItemTreeNode,
  dimensions: Dimensions
) {
  return getHierarchyNodes<SunburstItem>({ dimensions, rootTreeNode, partitionLayout: new SunburstItemPartitionLayout() });
}
