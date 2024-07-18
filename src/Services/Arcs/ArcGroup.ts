import { Arc } from 'd3';

import { getArc } from './getArc';
import { getPaddedArc } from './getPaddedArc';
import { ArcCoordinates, Arcs } from './Types';
import { zeroArc } from './zeroArc';

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

