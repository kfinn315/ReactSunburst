import getLastArrayItem from "../../Shared/getLastArrayItem";
import { SegmentNode } from "../../Tree/Types";
import { SunburstItem } from "../Types";


function getSegments(item: SunburstItem): string[] {
    return item.name.split('.');
}

export function convertToSegmentNode(item: SunburstItem): SegmentNode<SunburstItem> {

    const segments = getSegments(item);
    const name = getLastArrayItem(segments) ?? "";
    return { segments, name, data: item };
}
