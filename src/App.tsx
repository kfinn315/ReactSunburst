import './App.css'

import { JSONTree } from 'react-json-tree'

import { flatData } from './data'
import { getRootHierarchyNode as getRootHierarchyNodeForSunburstItems } from './Services/SunburstItemRootHierarchyNode'
import { getColorScale } from './Utils/getColorScale'
import { HierarchyNode } from 'd3'
import { SunburstContainer, SunburstItem, SunburstHighlighter, TreeNode } from 'kfinn315_sunburst';

function App() {
    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'red']
    const colorScale = getColorScale(flatData, colorGradient)
    const svgDimension = 1400
    const rootHierarchyNode: HierarchyNode<TreeNode<SunburstItem>> = getRootHierarchyNodeForSunburstItems(flatData)
    return (
        <div className="content">
            <div className="description">
                <p>
                    Here is a demonstration of the React Sunburst component that I wrote to practice code organization
                    and structure. It uses React JS and D3.js.
                </p>
                <p>
                    The input must be an object of type <code>HierarchyNode&lt;TreeNode&lt;SunburstItem&gt;&gt;</code>
                </p>
            </div>
            <SunburstContainer
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

export default App
