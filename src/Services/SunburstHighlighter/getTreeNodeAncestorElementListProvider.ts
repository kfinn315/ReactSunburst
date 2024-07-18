import { HierarchyNode } from 'd3'

import { IElementProvider } from '../../Utils/ElementProvider'
import { getHierarchyNodeAncestorData } from '../../Utils/getAncestorData'
import { isNotNull } from '../../Utils/isNotNull'
import { ElementListProvider } from '../Highlighter'
import { TreeNode } from '../TreeCreator'

export function getTreeNodeAncestorElementListProvider<
  TDatum,
  TElement extends Element = Element,
>(
  elementProvider: IElementProvider<TreeNode<TDatum>, TElement>,
): ElementListProvider<HierarchyNode<TreeNode<TDatum>>, TElement> {
  return {
    get(item: HierarchyNode<TreeNode<TDatum>>): TElement[] {
      return getHierarchyNodeAncestorData(item)
        .map((x) => elementProvider.get(x))
        .filter((x) => isNotNull(x)) as TElement[]
    },
    getAll(): TElement[] {
      return elementProvider.getAll()
    },
  }
}
