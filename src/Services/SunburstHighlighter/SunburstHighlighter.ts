import { getHighlighter } from '../Highlighter'
import AncestorElementProvider from './AncestorElementProvider'

export function createSunburstHighlighter(
  gElementRef: React.MutableRefObject<SVGGElement | null>,
) {
  const provider = new AncestorElementProvider(gElementRef)
  return getHighlighter(provider)
}
