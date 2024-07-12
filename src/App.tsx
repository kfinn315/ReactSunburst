import './App.css'
import SunburstEvent from './Components/Sunburst/SunburstEvent';
import { max, min, scaleLinear, HierarchyNode, HierarchyRectangularNode } from 'd3';
import { useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { sunburstItemData } from './data';
import { SunburstItem, SunburstItemTreeNode } from './Components/Types';
import BoxDimensions from './Shared/BoxDimensions';
import Sunburst from './Components/Sunburst/Sunburst';
import { createSunburstHighlighter } from './Components/SunburstHighlighter/SunburstHighlighter';
import SunburstItemHierarchyNode from './Components/SunburstItemHierarchyNode/SunburstItemHierarchyNode';

function App() {
    const [detail, setDetail] = useState<string | undefined>();
    const radius = 300;
    const sunburstDimensions: BoxDimensions = {
        width: 2 * Math.PI,
        height: radius * radius
    };
    const colorGradient = ["blue", "red"]
    const centerColor = "blue"
    const colorScale = scaleLinear([min(sunburstItemData, x => x.color) ?? 0, max(sunburstItemData, x => x.color) ?? 0], colorGradient)

    const hierarchyNodes: Array<HierarchyRectangularNode<SunburstItemTreeNode>> = SunburstItemHierarchyNode(sunburstItemData, sunburstDimensions).descendants();

    function summarizeItem(item: HierarchyNode<SunburstItemTreeNode>): string {
        return item.ancestors().map(x => x.data?.name ?? "?").reverse().slice(1).join('.')
    }

    const mouseEnterHandler: SunburstEvent<SunburstItemTreeNode> = (_: MouseEvent, d: HierarchyNode<SunburstItemTreeNode>): void => { setDetail(summarizeItem(d)); };

    const mouseLeaveHandler: SunburstEvent<SunburstItemTreeNode> = () => { setDetail(undefined); };

    const svgDimension = radius * 2;

    const getArcColor = (d: HierarchyRectangularNode<SunburstItemTreeNode>) => d.data.data?.color ? colorScale(d.data.data.color) : centerColor

    return (<>
        <h1>React Sunburst Demo</h1>
        <div className="content">
            <div className='data'>
                <h2>Data</h2>
                <JSONTree data={sunburstItemData} />
            </div>
            <div className='sunburst-content'>
                <svg width={svgDimension} height={svgDimension}>
                    <Sunburst<SunburstItem> getHighlighter={createSunburstHighlighter} getArcColor={getArcColor} radius={radius} items={hierarchyNodes} mouseEnterEvent={mouseEnterHandler} mouseLeaveEvent={mouseLeaveHandler} arcIsClickable={() => false} />
                </svg>
                <label>{detail}</label>
            </div>
        </div>
    </>
    )
}

export default App
