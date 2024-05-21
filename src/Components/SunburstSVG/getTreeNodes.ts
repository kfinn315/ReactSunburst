import SunburstViewItem from "../../Models/SunburstViewItem";
import SegmentNode from "../Tree/Models/SegmentNode";

export default function getTreeNodes(items: SunburstViewItem[], getSegments: (item: SunburstViewItem) => string[]): SegmentNode<SunburstViewItem>[] {
  function getName(segments: string[]): string {
    return segments?.[segments.length - 1] ?? "";
  }

  const treeNodes: SegmentNode<SunburstViewItem>[] = items.map(item => {
    const segments = getSegments(item);
    const name = getName(segments);
    const data: SunburstViewItem = { ...item, name };
    return { segments: segments.values(), data } as SegmentNode<SunburstViewItem>;
  });

  return treeNodes;
}
