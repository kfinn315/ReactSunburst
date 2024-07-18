import './App.css'

import { max, min, scaleLinear } from 'd3'
import { JSONTree } from 'react-json-tree'

import { SunburstContainer } from './Components/SunburstContainer'
import { flatData } from './data'
import { createSunburstHighlighter } from './Services/SunburstHighlighter'
import { getRootHierarchyNode } from './Services/SunburstItemRootHierarchy'

function App() {
  const colorGradient = ['blue', 'red']
  const centerColor = 'blue'
  const colorScale = scaleLinear(
    [min(flatData, (x) => x.color) ?? 0, max(flatData, (x) => x.color) ?? 0],
    colorGradient,
  )

  const svgDimension = 1400

  const rootHierarchyNode = getRootHierarchyNode(flatData)

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
        getHighlighter={createSunburstHighlighter}
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
