import { MutableRefObject } from 'react';

export interface IElementProvider<T, E extends Element = Element> {
  forItem: (item: T) => E | undefined;
  getAll: () => E[];
}

/**
 * @param T type of input item
 * @param B type of ref
 * @param E type of returned Element
 * @param ref 
 * @param getSelector 
 * @param allSelector 
 * @returns 
 */
export default function ElementProvider<T, B extends Element = Element, E extends Element = Element>(
  ref: MutableRefObject<B | null>,
  getSelector: (item?: T) => string
): IElementProvider<T, E> {

  function getElementForItem(item: T): E | undefined {
    if (item == undefined) {
      return undefined;
    }
    const selector = getSelector(item)
    if (selector === "") {
      return undefined;
    }
    return ref.current?.querySelector<E>(selector);
  }

  function getAll(): E[] {
    return [...ref.current?.querySelectorAll<E>(getSelector())?.values() ?? []];
  }

  return { forItem: getElementForItem, getAll };
}
