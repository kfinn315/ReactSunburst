import { TreeNode } from './Types'

export class Nodey<TData> implements TreeNode<TData> {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly children: Nodey<TData>[] = [],
    public data?: TData,
  ) {}

  getChild(name: string): Nodey<TData> | undefined {
    return this.children.find((child) => child.name === name)
  }

  addChild(childNode: Nodey<TData>) {
    this.children.push(childNode)
  }
}
