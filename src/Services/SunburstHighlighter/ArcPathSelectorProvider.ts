import { SunburstItemTreeNode } from '../../Models'
import { SelectorProvider } from '../../Utils/ElementProvider'

export const arcPathSelectorProvider: SelectorProvider<SunburstItemTreeNode> = {
  getAll: () => '.arc>path', //select all paths
  get: (item) => `.arc>path[data-id="${String(item.id)}"]`,
}
