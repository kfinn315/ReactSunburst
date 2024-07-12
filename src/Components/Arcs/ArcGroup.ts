import { Arc, arc } from 'd3';
import { ArcCoordinates } from './Types';

export default class ArcGroup {
  readonly padded: Arc<unknown, ArcCoordinates>
  readonly basic: Arc<unknown, ArcCoordinates>
  readonly zero: Arc<unknown, ArcCoordinates>
  constructor(radius: number) {
    this.padded = getPaddedArc(radius);
    this.basic = getPlainArc(radius);
    this.zero = zeroArc;
  }
}

/**
 * Arc with no radius or angle
 */
export const zeroArc = arc<unknown, ArcCoordinates>()
  .startAngle(0)
  .endAngle(0)
  .innerRadius(0)
  .outerRadius(0);

/**
 * Get Arc with radius 
 */
export const getPlainArc = (radius: number): Arc<unknown, ArcCoordinates> => arc<unknown, ArcCoordinates>()
  .startAngle((d) => d.x0)
  .endAngle((d) => d.x1)
  .innerRadius((d) => Math.sqrt(d.y0))
  .outerRadius(radius);

/**
* Get Arc with radius and padding
*/
export const getPaddedArc = (radius: number): Arc<unknown, ArcCoordinates> => arc<unknown, ArcCoordinates>()
  .startAngle((d) => d.x0)
  .endAngle((d) => d.x1)
  .padAngle(1 / radius)
  .padRadius(radius)
  .innerRadius((d) => Math.sqrt(d.y0))
  .outerRadius((d) => Math.sqrt(d.y1) - 1);

