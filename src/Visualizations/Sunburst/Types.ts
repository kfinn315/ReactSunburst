import { HierarchyRectangularNode } from 'd3';

export interface HasNumericColor { color: number }
export type SunburstEvent<T> = (event: MouseEvent, d: HierarchyRectangularNode<T>) => void;
