import { SunburstItem } from "../../Types";

export type GetSegmentIteratorMethod<TData> = (item: TData) => IterableIterator<string>

export function getSegmentIterator(item: SunburstItem): IterableIterator<string> {
  return item.name.split('.').values();
}
