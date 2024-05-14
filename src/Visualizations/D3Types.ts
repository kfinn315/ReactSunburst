import { ScaleLinear, ScaleOrdinal, Selection } from 'd3';

export interface Coordinates {
    x: number
    y: number
}
export interface CssPadding {
    top: number
    right: number
    bottom: number
    left: number
}

export interface Dimensions {
    width: number
    height: number
}

export interface Offset {
    top: number;
    left: number;
}

export type Orientation = 'horizontal' | 'vertical'

export type NumberScaleLinear = ScaleLinear<number, number, never>;
export type StringScaleLinear = ScaleLinear<string, string, never>;
export type SVGSelection = Selection<SVGSVGElement, never, never, never>;
export type HTMLSelection = Selection<HTMLElement, never, never, never>;
export type ColorScale = ScaleLinear<string, string, string> | ScaleOrdinal<number, string, string>;

export interface FontDescription {
    family: string
    size: string
}
