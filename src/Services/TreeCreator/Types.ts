export interface SegmentNode<TData> {
  segments: string[]
  data: TData
}

export interface TreeNode<TData> {
  id: number
  name?: string
  data?: TData
  children: TreeNode<TData>[]
}
