import { arc } from 'd3'

import { ArcCoordinates } from './Types'

/**
 * Arc with no radius or angle
 */

export const zeroArc = arc<unknown, ArcCoordinates>()
  .startAngle(0)
  .endAngle(0)
  .innerRadius(0)
  .outerRadius(0)
