import { Arc, arc } from 'd3';
import { ArcCoordinates, Arcs } from './Types';

export default class ArcGroup implements Arcs {
  readonly padded: Arc<unknown, ArcCoordinates>
  readonly basic: Arc<unknown, ArcCoordinates>
  readonly zero: Arc<unknown, ArcCoordinates>
  constructor(radius: number) {
    this.padded = getPaddedArc(radius);
    this.basic = getArc(radius);
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
 * 
 * Calculates and returns an arc shape with the specified radius.
 * The arc is defined by the startAngle, endAngle, innerRadius, and outerRadius.
 * 
 * @param radius The radius of the arc.
 * @returns An Arc generator function.
 */
export const getArc = (radius: number): Arc<unknown, ArcCoordinates> => arc<unknown, ArcCoordinates>()
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

