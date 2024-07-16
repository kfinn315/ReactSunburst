import { HierarchyNode } from "d3";

type SunburstEvent<T> = (event: MouseEvent, d: HierarchyNode<T>) => void;

export default SunburstEvent;
