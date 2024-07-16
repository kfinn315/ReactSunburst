import './App.css'
import { max, min, scaleLinear, HierarchyNode, HierarchyRectangularNode } from 'd3';
import { useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { flatData } from './data';
import { SunburstItemTreeNode } from './Models/SunburstItemTreeNode';
import { SunburstItem } from './Models/SunburstItem';
import BoxDimensions from './Types/BoxDimensions';
import { Sunburst, SunburstEvent } from './Components/Sunburst';
import { createSunburstHighlighter } from './Services/SunburstHighlighter/SunburstHighlighter';
import { SunburstItemHierarchyNode } from './Services/SunburstItemHierarchyNode';

function App() {
    const [detail, setDetail] = useState<string | undefined>();
    const radius = 700;
    const svgDimension = radius * 2;
    const sunburstDimensions: BoxDimensions = {
        width: 2 * Math.PI,
        height: radius * radius
    };
    const colorGradient = ["blue", "red"]
    const centerColor = "blue"
    const colorScale = scaleLinear([min(flatData, x => x.color) ?? 0, max(flatData, x => x.color) ?? 0], colorGradient)

    const hierarchyNodes: HierarchyRectangularNode<SunburstItemTreeNode>[] = SunburstItemHierarchyNode(flatData, sunburstDimensions).descendants();

    function itemDetail(item: HierarchyNode<SunburstItemTreeNode>): string {
        return item.ancestors().map(x => x.data.name ?? "?").reverse().slice(1).join('.')
    }

    const mouseEnterHandler: SunburstEvent<SunburstItemTreeNode> = (_: MouseEvent, d: HierarchyNode<SunburstItemTreeNode>): void => { setDetail(itemDetail(d)); };

    const mouseLeaveHandler: SunburstEvent<SunburstItemTreeNode> = () => { setDetail(undefined); };

    const getArcColor = (d: HierarchyRectangularNode<SunburstItemTreeNode>) => d.data.data?.color ? colorScale(d.data.data.color) : centerColor

    return (
        <div className="content">
            <div className='description'>
                <p>
                    The below is a demonstration of the React Sunburst component, written using React JS and D3.js, that I wrote to practice code organization and structure.
                </p>
            </div>
            <div className="visualization-wrapper">
                <div className='sunburst-wrapper'>
                    <svg width={svgDimension} height={svgDimension} viewBox={`0 0 ${String(svgDimension)} ${String(svgDimension)}`} >
                        <Sunburst<SunburstItem> getHighlighter={createSunburstHighlighter} getArcColor={getArcColor} radius={radius} items={hierarchyNodes} mouseEnterEvent={mouseEnterHandler} mouseLeaveEvent={mouseLeaveHandler} arcIsClickable={() => false} />
                    </svg>
                </div>
                <div className="detail">
                    <label>{detail}</label>
                </div>
            </div>
            <div className='data'>
                <h2>Data</h2>
                <JSONTree data={flatData} />
            </div>
        </div>
    )
}

export default App
