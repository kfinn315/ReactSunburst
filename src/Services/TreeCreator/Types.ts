export interface SegmentNode<TData> {
  segments: string[]
  data: TData
}

export interface TreeNode<TData> {
  id: number
  name: string | null
  data?: TData
  children: TreeNode<TData>[]
}
