
export interface SegmentNode<T> {
    segments: string[];
    name: string;
    data: T;
};

export type TreeNode<T> = {
    id: number,
    name: string,
    children: TreeNode<T>[]
    data?: T
}

export interface ITree<T> {
    rootNode: TreeNode<T>;
}

export interface Segment<T> {
    iterator: IterableIterator<string>;
    id: number //full sequence name
    name: string // segment name
    data: T
    done: boolean;
}

export type NewSegment<T> = Segment<T> & { id?: number }