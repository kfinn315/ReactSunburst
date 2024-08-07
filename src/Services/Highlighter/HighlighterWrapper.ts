import { HierarchyNode } from 'd3'
import { MutableRefObject } from 'react'
import { GetHighlighter } from '../SunburstHighlighter'
import { TreeNode } from '../TreeCreator'
import { Highlighter, IHighlighterWrapper } from './Types'

export class HighlighterWrapper<TData> implements IHighlighterWrapper<TData> {
  private highlighter: Highlighter<HierarchyNode<TreeNode<TData>>> | undefined =
    undefined

  constructor(private readonly getHighlighter: GetHighlighter<TData>) { }

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
