
/**
 * Highlighter methods
 */
export interface Highlighter<T> {
    clear: () => void;
    highlight: (item: T) => void;
}

/**
 * Provides Element lists for a specific item and all Elements
 */
export interface IElementsProvider<T, E extends Element = Element> {
    getForItem: (item: T) => E[];
    getAll: () => E[];
}
