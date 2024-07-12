import { HierarchyNode } from "d3";
import { TreeNode } from "../../Tree/Types";
import { Highlighter } from "../../Highlighter/Types";


export type GetHighlighterMethod<T> = (gElementRef: React.MutableRefObject<SVGGElement | null>) => Highlighter<HierarchyNode<TreeNode<T>>>;
