
export interface SegmentNode<T> {
    segments: string[];
    data: T;
};


export interface TreeNode<T> {
    id: number,
    name: string | null,
    data?: T
    children: TreeNode<T>[]
}
