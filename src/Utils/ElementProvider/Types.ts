
export type ISelectorProvider<TDatum> = (item?: TDatum) => string;

export interface IElementProvider<TDatum, TElement extends Element = Element> {
    forItem: (item: TDatum) => TElement | null;
    getAll: () => TElement[];
}
