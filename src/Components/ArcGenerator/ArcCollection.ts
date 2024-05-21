import { Arc } from 'd3';
import ArcCoordinates from './ArcCoordinates';

export default interface ArcCollection {
  main: Arc<unknown, ArcCoordinates>
  mouse: Arc<unknown, ArcCoordinates>
  zero: Arc<unknown, ArcCoordinates>
}
