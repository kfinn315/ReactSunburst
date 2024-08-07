import './App.css'

import { JSONTree } from 'react-json-tree'

import { SunburstContainer } from './Components/SunburstContainer'
import { flatData } from './data'
import { SunburstHighlighter } from './Services/SunburstHighlighter'
import { getRootHierarchyNodeForFlatData } from './Services/SunburstItemRootHierarchyNode'
import { getColorScale } from './Utils/getColorScale'

function App() {
    const centerColor = 'blue'

    const colorGradient: [string, string] = ['blue', 'red']
    const colorScale = getColorScale(flatData, colorGradient)

    const svgDimension = 1400

    const rootHierarchyNode = getRootHierarchyNodeForFlatData(flatData)

    return (
        <div className="content">
            <div className="description">
                <p>
                    The below is a demonstration of the React Sunburst component, written
                    using React JS and D3.js, that I wrote to practice code organization
                    and structure.
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
