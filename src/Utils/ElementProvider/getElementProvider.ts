import { MutableRefObject } from 'react'

import { IElementProvider, SelectorProvider } from './Types'

/**
 * Creates an element provider that retrieves and returns elements based on a selector.
 * @typeparam TInput - The type of the input item.
 * @typeparam TRef - The type of the ref.
 * @typeparam TElement - The type of the returned element.
 * @param ref - The mutable ref object containing the target element.
 * @param selectorProvider - The selector provider for obtaining selectors.
 * @returns The element provider object.
 */
export function getElementProvider<
  TInput,
  TRef extends Element = Element,
  TElement extends Element = Element,
>(
  ref: MutableRefObject<TRef | null>,
  selectorProvider: SelectorProvider<TInput>,
): IElementProvider<TInput, TElement> {

  /**
     * Retrieves an element for the specified item.
     * @param item - The item for which to retrieve the element.
     * @returns The element corresponding to the item, or null if not found.
     */
  function get(item: TInput): TElement | null {
    if (item == undefined) {
      return null
    }
    const selector = selectorProvider.get(item)

    return ref.current?.querySelector<TElement>(selector) ?? null
  }

  /**
   * Retrieves all elements base ond the selector.
   * @returns An array of elements
   */
  function getAll(): TElement[] {
    return Array.from(ref.current?.querySelectorAll<TElement>(selectorProvider.getAll()) ?? [])
  }

  return { get, getAll }
}
