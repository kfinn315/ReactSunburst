import AncestorElementProvider from "./AncestorElementProvider";
import { getHighlighter } from "../Highlighter";

export function createSunburstHighlighter(gElementRef: React.MutableRefObject<SVGGElement | null>) {
  const provider = new AncestorElementProvider(gElementRef);
  return getHighlighter(provider)
}
