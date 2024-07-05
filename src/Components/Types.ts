
export interface SunburstItem {
    id: number;
    name: string;
    color: number;
    size: number;
    clickable?: boolean;
}

export type MyNode<T> = T & {
    children?: T[]
}

export interface SunburstItemNode extends SunburstItem, MyNode<SunburstItem> {
    children?: SunburstItemNode[]
}
