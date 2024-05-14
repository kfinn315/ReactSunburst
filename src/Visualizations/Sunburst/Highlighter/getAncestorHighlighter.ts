import { HierarchyNode } from 'd3';
import { IHighlightManager } from '../../Highlighter/HighlightManager';
import HighlightItems from './HighlightItems';

export default function getAncestorHighlighter<T, E extends Element = Element>(highlightService: IHighlightManager, getAncestorPaths: (x: HierarchyNode<T>) => E[], getAll: () => E[]): HighlightItems<HierarchyNode<T>> {
  function highlightItem(node: HierarchyNode<T>): void {
    highlightService?.addHighlight(getAncestorPaths(node));
  }

  function unhighlightAllItems() {
    highlightService?.removeHighlights(getAll())
  }

  return {
    highlightItem,
    unhighlightAllItems
  };
}
