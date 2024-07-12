import { SegmentNode } from "../../Tree/Types";
import { SunburstItem } from "../Types";


function getSegments(item: SunburstItem): string[] {
    return item.name.split('.');
}

export function convertToSegmentNode(item: SunburstItem): SegmentNode<SunburstItem> {

    const segments = getSegments(item);
    return { segments, data: item };
}
