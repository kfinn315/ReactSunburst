import { HierarchyNode } from "d3";
import { TreeNode } from "../Tree";
import { MutableRefObject } from "react";

/**
 * Highlighter methods
 */
export interface Highlighter<T> {
  clear: () => void
  highlight: (item: T) => void
}

/**
 * Provides Element lists for a specific item and all Elements
 */
export interface ElementListProvider<
  TInput,
  TElement extends Element = Element,
> {
  get: (item: TInput) => TElement[]
  getAll: () => TElement[]
}

export type IHighlighterWrapper<TData> = Highlighter<HierarchyNode<TreeNode<TData>>> & {
  setRef(ref: MutableRefObject<SVGGElement | null>): void;
};
