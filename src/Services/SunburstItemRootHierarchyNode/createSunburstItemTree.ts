import { SunburstItem } from "../../Types";
import { createTree } from "../TreeCreator";
import { getSegmentIterator } from "./getSegmentIterator";


export function createSunburstItemTree(items: readonly SunburstItem[]) {
    return createTree(items, getSegmentIterator);
}
