import { HierarchyRectangularNode, ScaleLinear } from 'd3';
import Sunburst from '../Sunburst/Sunburst';
import SunburstEvent from '../Sunburst/SunburstEvent';
import { SunburstItem } from "../Types";
import SunburstItemTreeNode from './SunburstItemTreeNode';
import { TreeNode } from '../../Tree/Types';

export interface Props {
  nodes: HierarchyRectangularNode<TreeNode<SunburstItem>>[]
  duration?: number
  centerColor?: string
  clickEvent?: SunburstEvent<SunburstItemTreeNode>
  mouseEnterEvent?: SunburstEvent<SunburstItemTreeNode>
  mouseLeaveEvent?: SunburstEvent<SunburstItemTreeNode>
  centerElement?: JSX.Element
  colorScale: ScaleLinear<string, string, never>
  width: number
  height: number
  radius: number //Sunburst radius size (in pixels)
}

export default function SunburstSVG(props: Props): JSX.Element {
  const { nodes, width, height, radius, centerColor, centerElement, clickEvent, duration, mouseEnterEvent, mouseLeaveEvent, colorScale
  } = props;

  return <svg width={width} height={height}>
    <Sunburst<SunburstItem> colorScale={colorScale} radius={radius} items={nodes} centerColor={centerColor} centerElement={centerElement} clickEvent={clickEvent} duration={duration} mouseEnterEvent={mouseEnterEvent} mouseLeaveEvent={mouseLeaveEvent} />
  </svg>;
}
