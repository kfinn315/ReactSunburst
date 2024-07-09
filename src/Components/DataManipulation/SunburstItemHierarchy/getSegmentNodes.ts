import { SegmentNode } from '../../../Tree/Types';
import { SunburstItem } from '../../Types';

function getSegments(item: SunburstItem): string[] {
  return item.name.split('.');
}

function getLastArrayItem<T = string>(array: T[]): T {
  return array?.[array.length - 1];
}

export default function getSegmentNodes(items: SunburstItem[]): SegmentNode<SunburstItem>[] {

  const getSegmentNode = (item: SunburstItem): SegmentNode<SunburstItem> => {
    const segments = getSegments(item)
    const name = getLastArrayItem(segments) ?? ""
    return { segments: segments, name, data: item }
  }

  return items.map(getSegmentNode);
}
