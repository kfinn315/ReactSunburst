import { HierarchyNode } from "d3";
import { TreeNode } from "../Tree";
import { Highlighter } from "../Highlighter";


export type GetHighlighterMethod<T> = (gElementRef: React.MutableRefObject<SVGGElement | null>) => Highlighter<HierarchyNode<TreeNode<T>>>;
