import { MutableRefObject } from 'react'

import { IElementProvider, SelectorProvider } from './Types'

/**
 * @param TInput type of input item
 * @param TRef type of ref
 * @param TElement type of returned Element
 * @param getElementForItem
 * @param getAll
 * @returns
 */
export default function getElementProvider<
  TInput,
  TRef extends Element = Element,
  TElement extends Element = Element,
>(
  ref: MutableRefObject<TRef | null>,
  selectorProvider: SelectorProvider<TInput>,
): IElementProvider<TInput, TElement> {
  function getElementForItem(item: TInput): TElement | null {
    if (item == undefined) {
      return null
    }
    const selector = selectorProvider.get(item)

    return ref.current?.querySelector<TElement>(selector) ?? null
  }

  function getAll(): TElement[] {
    return [
      ...(ref.current
        ?.querySelectorAll<TElement>(selectorProvider.getAll())
        .values() ?? []),
    ]
  }

  return { get: getElementForItem, getAll }
}
