import { TreeNode } from './Types';

export function findNode<TData>(children: TreeNode<TData>[], name: string): TreeNode<TData> | undefined {
    return children.find(x => x.name === name);
}
