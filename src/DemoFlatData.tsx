import './App.css'

import { JSONTree } from 'react-json-tree'

import { flatData } from './data'
import { getRootHierarchyNode as getRootHierarchyNodeForSunburstItems } from './Services/SunburstItemRootHierarchyNode'
import { getColorScale } from './Utils/getColorScale'
import { HierarchyNode } from 'd3'
import { SunburstItem, SunburstHighlighter, TreeNode, SunburstItemSunburstContainer } from 'kfinn315_sunburst';

function DemoFlatData() {
    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'red']
    const colorScale = getColorScale(flatData, colorGradient)
    const svgDimension = 1400
    const rootHierarchyNode: HierarchyNode<TreeNode<SunburstItem>> = getRootHierarchyNodeForSunburstItems(flatData)
    return (
        <div className="content">
            <h2>Flat Data Demo</h2>
            <SunburstItemSunburstContainer
                dimensions={{ width: svgDimension, height: svgDimension }}
                highlighter={new SunburstHighlighter()}
                rootNode={rootHierarchyNode}
                colorScale={colorScale}
                centerColor={centerColor}
            />
            <div className="data">
                <h2>Data</h2>
                <JSONTree data={flatData} />
            </div>
        </div>
    )
}

export default DemoFlatData
