
export interface TreeNode<TData> {
  id: number
  name?: string
  data?: TData
  children: TreeNode<TData>[]
}


export interface IDGenerator {
  next(): number;
}
