
export default interface HighlightItems<T> {
  unhighlightAllItems: () => void;
  highlightItem: (item: T) => void;
}
