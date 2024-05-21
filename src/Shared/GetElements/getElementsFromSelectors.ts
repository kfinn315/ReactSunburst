import { MutableRefObject } from 'react';
import IGetElements from './IGetElements';

/**
 * @param T type of input item
 * @param B type of ref
 * @param E type of returned Element
 * @param ref 
 * @param getSelector 
 * @param allSelector 
 * @returns 
 */
export default function getElementsFromSelectors<T, B extends Element = Element, E extends Element = Element>(
  ref: MutableRefObject<B | null>,
  getSelector: (item?: T) => string
): IGetElements<T, E> {

  function getElementForItem(item: T): E | undefined {
    if (item == undefined) {
      return undefined;
    }
    return ref.current?.querySelector<E>(getSelector(item)) ?? undefined;
  }

  function getAll(): E[] {
    return [...ref.current?.querySelectorAll<E>(getSelector())?.values() ?? []];
  }

  return { forItem: getElementForItem, getAll };
}
