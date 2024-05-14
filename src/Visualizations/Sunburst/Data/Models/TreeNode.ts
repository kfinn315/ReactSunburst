
type TreeNode<D> = D & {
    name: string,
    children: TreeNode<D>[]
}

export default TreeNode;