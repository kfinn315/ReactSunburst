import { SegmentNode } from '../../Tree/Types';
import { SunburstItem } from '../Types';

export default function getSegmentNode(items: SunburstItem[]): SegmentNode<SunburstItem>[] {

  function getSegmentsBySplittingName(item: SunburstItem): string[] {
    return item.name.split('.');
  }

  function getLastSegment(segments: string[]): string {
    return segments?.[segments.length - 1] ?? "";
  }

  const getTreeNode = (item: SunburstItem): SegmentNode<SunburstItem> => {
    const segments = getSegmentsBySplittingName(item)
    const name = getLastSegment(segments)
    return { segments: segments, name, data: item }
  }

  const x = items.map(getTreeNode);
  // console.log(x)
  return x;
}
