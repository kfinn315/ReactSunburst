import { SunburstItem } from "../../Types";

export function getSegmentIterator(item: SunburstItem): IterableIterator<string> {
  return item.name.split('.').values();
}
