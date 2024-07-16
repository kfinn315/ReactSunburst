import { MutableRefObject } from 'react';

export interface IElementProvider<T, E extends Element = Element> {
  forItem: (item: T) => E | null;
  getAll: () => E[];
}

export type ISelectorProvider<T> = (item?: T) => string;


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
  getSelector: ISelectorProvider<T>
): IElementProvider<T, E> {

  function getElementForItem(item: T): E | null {
    if (item == undefined) {
      return null;
    }
    const selector = getSelector(item)

    if (selector === "") {
      return null;
    }
    return ref.current?.querySelector<E>(selector) ?? null;
  }

  function getAll(): E[] {
    return [...ref.current?.querySelectorAll<E>(getSelector()).values() ?? []];
  }

  return { forItem: getElementForItem, getAll };
}
