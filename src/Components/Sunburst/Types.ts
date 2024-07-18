import { HierarchyNode } from 'd3';

type SunburstEvent<TDatum> = (event: MouseEvent, d: HierarchyNode<TDatum>) => void;

export default SunburstEvent;
