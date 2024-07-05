import './App.css'
import SunburstSVG from './Components/SunburstSVG/SunburstSVG'
import SunburstItemTreeNode from './Components/SunburstSVG/SunburstItemTreeNode';
import SunburstEvent from './Components/Sunburst/SunburstEvent';
import { max, min, scaleLinear, HierarchyNode, HierarchyRectangularNode } from 'd3';
import { useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { data } from './data';
import getSegmentNode from './Components/GetSegments/getSegmentNode';
import getSunburstViewHierarchy from './Components/SunburstSVG/getSunburstViewHierarchy';
import createTree from './Tree/Tree';
import { TreeNode } from './Tree/Types';
import { SunburstItem } from './Components/Types';
import Dimensions from './Shared/Dimensions';


function App() {
    const [detail, setDetail] = useState<string | undefined>();
    const radius = 200;
    const colorScale = scaleLinear([min(data, x => x.color) as number, max(data, x => x.color) as number], ["blue", "red"])

    const segmentItems = getSegmentNode(data);
    const rootTreeNode = createTree(segmentItems)

    const layoutDimensions: Dimensions = {
        width: 2 * Math.PI,
        height: radius * radius
    };

    const hierarchyNodes: HierarchyRectangularNode<TreeNode<SunburstItem>>[] = getSunburstViewHierarchy(rootTreeNode, layoutDimensions);

    function summarizeItem(item: HierarchyNode<SunburstItemTreeNode>): string {
        return item.ancestors().map(x => x.data?.name ?? "?").reverse().join('.')
    }

    const mouseEnterHandler: SunburstEvent<SunburstItemTreeNode> = (_: MouseEvent, d: HierarchyNode<SunburstItemTreeNode>): void => { setDetail(summarizeItem(d)); };

    const mouseLeaveHandler: SunburstEvent<SunburstItemTreeNode> = () => { setDetail(undefined); };


    return (<>
        <h1>React Sunburst Demo</h1>
        <div className="content">
            <div className='data'>
                <h2>Data</h2>
                <JSONTree data={data} />
            </div>
            <div className='sunburst-content'>
                <SunburstSVG colorScale={colorScale} nodes={hierarchyNodes} radius={radius} width={radius * 2} height={radius * 2} centerColor='blue' mouseEnterEvent={mouseEnterHandler} mouseLeaveEvent={mouseLeaveHandler} />
                <label>{detail}</label>
            </div>
        </div>
    </>
    )
}

export default App
