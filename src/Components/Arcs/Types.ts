import { Arc } from 'd3';

export interface ArcCollection {
  main: Arc<unknown, ArcCoordinates>
  mouse: Arc<unknown, ArcCoordinates>
  zero: Arc<unknown, ArcCoordinates>
}


export interface ArcCoordinates {
  x0: number
  x1: number
  y0: number
  y1: number
}
