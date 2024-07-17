

export interface IElementProvider<TDatum, TElement extends Element = Element> {
    forItem: (item: TDatum) => TElement | null;
    getAll: () => TElement[];
}

export interface SelectorProvider<TDatum> {
    forItem: (item: TDatum) => string;
    forAll: () => string;
}
