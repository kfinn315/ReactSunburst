import { MyNode } from './MyNode';
import { SunburstItem } from './SunburstItem';

export interface SunburstItemNode extends SunburstItem, MyNode<SunburstItem> {
    children?: SunburstItemNode[];
}
