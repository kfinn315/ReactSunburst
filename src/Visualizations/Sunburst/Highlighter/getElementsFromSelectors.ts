import { MutableRefObject } from 'react';
import GetElementsMethods from './GetElementsMethods';

export default function getElementsFromSelectors<T, B extends Element = Element, E extends Element = Element>(ref: MutableRefObject<B | null>, getSelector: (item: T) => string, allSelector: string): GetElementsMethods<T, E> {

  function getElementForItem(item: T): E | undefined {
    if (item == null) {
      return undefined;
    }
    return ref.current?.querySelector<E>(getSelector(item)) ?? undefined;
  }

  function getAll(): E[] {
    return [...ref.current?.querySelectorAll<E>(allSelector)?.values() ?? []];
  }

  return { getElementForItem, getAll };
}
