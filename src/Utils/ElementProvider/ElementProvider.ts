import { MutableRefObject } from 'react';
import { IElementProvider, ISelectorProvider } from './Types';

/**
 * @param TInput type of input item
 * @param TRef type of ref
 * @param TElement type of returned Element
 * @param ref 
 * @param getSelector 
 * @param allSelector 
 * @returns 
 */
export default function ElementProvider<TInput, TRef extends Element = Element, TElement extends Element = Element>(
  ref: MutableRefObject<TRef | null>,
  getSelector: ISelectorProvider<TInput>
): IElementProvider<TInput, TElement> {

  function getElementForItem(item: TInput): TElement | null {
    if (item == undefined) {
      return null;
    }
    const selector = getSelector(item)

    if (selector === "") {
      return null;
    }
    return ref.current?.querySelector<TElement>(selector) ?? null;
  }

  function getAll(): TElement[] {
    return [...ref.current?.querySelectorAll<TElement>(getSelector()).values() ?? []];
  }

  return { forItem: getElementForItem, getAll };
}
