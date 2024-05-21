import { Arc, arc } from 'd3';
import ArcCollection from './ArcCollection';
import ArcCoordinates from './ArcCoordinates';

export default function getArcGenerators(radius: number): ArcCollection {

  const zeroArc = arc<unknown, ArcCoordinates>()
    .startAngle(0)
    .endAngle(0)
    .innerRadius(0)
    .outerRadius(0);

  const getPlainArc = (radius: number): Arc<unknown, ArcCoordinates> => arc<unknown, ArcCoordinates>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .innerRadius((d) => Math.sqrt(d.y0))
    .outerRadius(radius);

  const getPaddedArc = (radius: number): Arc<unknown, ArcCoordinates> => arc<unknown, ArcCoordinates>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle(1 / radius)
    .padRadius(radius)
    .innerRadius((d) => Math.sqrt(d.y0))
    .outerRadius((d) => Math.sqrt(d.y1) - 1);

  return { main: getPaddedArc(radius), mouse: getPlainArc(radius), zero: zeroArc }
}
