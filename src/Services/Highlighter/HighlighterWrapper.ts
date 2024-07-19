import { HierarchyNode } from 'd3'
import { MutableRefObject } from 'react'
import { GetHighlighterMethod } from '../SunburstHighlighter'
import { TreeNode } from '../TreeCreator'
import { Highlighter } from './Types'

export class HighlighterWrapper<TData>
  implements Highlighter<HierarchyNode<TreeNode<TData>>>
{
  private highlighter: Highlighter<HierarchyNode<TreeNode<TData>>> | undefined =
    undefined

  constructor(private readonly getHighlighter: GetHighlighterMethod<TData>) {}

  setRef(ref: MutableRefObject<SVGGElement | null>) {
    this.highlighter = this.getHighlighter(ref)
  }

  clear() {
    if (this.highlighter) {
      this.highlighter.clear()
    } else {
      console.info('Please call setRef() before clear()')
    }
  }
  highlight(item: HierarchyNode<TreeNode<TData>>) {
    if (this.highlighter) {
      this.highlighter.highlight(item)
    } else {
      console.info('Please call setRef() before highlight()')
    }
  }
}
