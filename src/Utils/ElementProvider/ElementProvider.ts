import { MutableRefObject } from 'react';

import { IElementProvider, SelectorProvider } from './Types';

/**
 * @param TInput type of input item
 * @param TRef type of ref
 * @param TElement type of returned Element
 * @param getElementForItem 
 * @param getAll 
 * @returns 
 */
export default function ElementProvider<TInput, TRef extends Element = Element, TElement extends Element = Element>(
  ref: MutableRefObject<TRef | null>,
  selectorProvider: SelectorProvider<TInput>
): IElementProvider<TInput, TElement> {

  function getElementForItem(item: TInput): TElement | null {
    if (item == undefined) {
      return null;
    }
    const selector = selectorProvider.forItem(item)

    return ref.current?.querySelector<TElement>(selector) ?? null;
  }

  function getAll(): TElement[] {
    return [...ref.current?.querySelectorAll<TElement>(selectorProvider.forAll()).values() ?? []];
  }

  return { forItem: getElementForItem, getAll };
}
