
export interface SegmentNode<T> {
    segments: string[];
    name: string;
    data: T;
};

export type TreeNode<T> = {
    name: string,
    children: TreeNode<T>[]
    data?: T
}

export interface ITree<T> {
    rootNode: TreeNode<T>;
}