import './App.css'

import { JSONTree } from 'react-json-tree'
import { hierarchy, HierarchyNode, HierarchyRectangularNode, partition, scaleLinear } from 'd3';
import { AncestorHighlighterFactory, BoxDimensions, HighlighterWrapper, SunburstContainer, SunburstItemNode } from 'kfinn315_sunburst';

import { hierarchicalData } from './data'

function DemoHierarchicalData() {
    const svgSideLength = 1400

    const svgDimensions: BoxDimensions = {
        width: svgSideLength,
        height: svgSideLength,
    }

    const radius = svgSideLength / 2;
    const partitionLayout = partition<SunburstItemNode>().size([2 * Math.PI, radius * radius])
    const rootHierarchyNode = hierarchy(hierarchicalData).sum(d => d.size).sort((a, b) => { return a.data.size - b.data.size })
    const nodes = partitionLayout(rootHierarchyNode).descendants()

    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'yellow']
    const colorScale = scaleLinear(
        [0, 1000],
        colorGradient
    )
    const getArcColor = (d: HierarchyRectangularNode<SunburstItemNode>) =>
        d.data.color ? colorScale(d.data.color) : centerColor

    function getItemDetail(item: HierarchyNode<SunburstItemNode>): string {
        return item
            .ancestors()
            .map((x) => x.data.name ?? '?')
            .reverse()
            .slice(1) //to remove "root"
            .join('.')
    }

    const factory = new AncestorHighlighterFactory<SunburstItemNode, Element>({
        get: (item: SunburstItemNode) => `.arc>path[data-id="${String(item.id)}"]`,
        getAll: () => '.arc>path' //select all paths
    });
    const highlighter = new HighlighterWrapper((ref) => factory.getHighlighter(ref))

    return (
        <div className="content">
            <h2>Hierarchical Data Demo</h2>
            <SunburstContainer<SunburstItemNode>
                getArcColor={getArcColor}
                getItemDetail={getItemDetail}
                nodes={nodes}
                radius={radius}
                svgDimensions={svgDimensions}
                highlighter={highlighter}
            />
            <div className="data">
                <h2>Data</h2>
                <JSONTree data={hierarchicalData} />
            </div>
        </div>
    )
}

export default DemoHierarchicalData
