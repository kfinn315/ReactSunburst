import { HierarchyNode } from "d3";
import { TreeNode } from "../Tree";
import { Highlighter } from "../Highlighter";


export type GetHighlighterMethod<TData> = (gElementRef: React.MutableRefObject<SVGGElement | null>) => Highlighter<HierarchyNode<TreeNode<TData>>>;
