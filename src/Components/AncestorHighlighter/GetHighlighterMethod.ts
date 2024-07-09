import { HierarchyNode } from "d3";
import { TreeNode } from "../../Tree/Types";
import { IAncestorHighlighter } from "./AncestorHighlighter";

export type GetHighlighterMethod<T> = (gElementRef: React.MutableRefObject<SVGGElement | null>) => IAncestorHighlighter<HierarchyNode<TreeNode<T>>>;
