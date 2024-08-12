import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import DemoHierarchicalData from './DemoHierarchicalData.tsx'
import DemoFlatData from './DemoFlatData.tsx'

const root = document.getElementById('root')

if (root != null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <>
        <div className="description">
          <p>
            Here is a demonstration of the React Sunburst component that I wrote to practice code organization
            and structure. It uses React JS and D3.js.
          </p>
        </div>
        <DemoHierarchicalData />
        <DemoFlatData />
      </>
    </React.StrictMode>,
  )
}
