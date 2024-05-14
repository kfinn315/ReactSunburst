import './App.css'
import SunburstSVG, { SunburstViewItemTN } from './Visualizations/SunburstSVG/SunburstSVG'
import SunburstViewItem from "./Visualizations/Sunburst/Data/Models/SunburstViewItem";
import SunburstDataDTO from "./Visualizations/Sunburst/Data/Models/SunburstDataDTO";
import { max, min, scaleLinear, HierarchyRectangularNode } from 'd3';
import { useState } from 'react';

function App() {
  const [detail, setDetail] = useState<string | undefined>();
  const data: SunburstDataDTO[] = [
    { id: 0, name: '1', color: 0, size: 200 },
    { id: 1, name: '1.2', color: 515, size: 10 },
    { id: 2, name: '1.2.3', color: 250, size: 2 },
    { id: 3, name: '1.2.4', color: 250, size: 21 },
    { id: 4, name: '2', color: 350, size: 120 },
    { id: 5, name: '2.3.25', color: 1000, size: 90 },
    { id: 7, name: '2.4', color: 1000, size: 90 },
    { id: 776, name: '0.3.25.38', color: 10, size: 9 },
  ];

  const colorScale = scaleLinear([min(data, x => x.color) as number, max(data, x => x.color) as number], ["blue", "red"])

  const convertedData = data.map<SunburstViewItem>(dto => ({
    id: dto.id, name: dto.name, color: dto.color, value: dto.size, arcColor: colorScale(dto.color)
  }));


  function getSegments(item: SunburstViewItem): string[] {
    return item.name.split('.')
  }

  function summarize(item: HierarchyRectangularNode<SunburstViewItemTN>): string {
    return item.ancestors().map(x => x.data?.name ?? "?").reverse().join('.')
  }

  const mouseEnterHandler = (e: MouseEvent, d: HierarchyRectangularNode<SunburstViewItemTN>): void => { setDetail(summarize(d)); };

  const mouseLeaveHandler = () => { setDetail(undefined); };

  return (<div>
    <h1>React Sunburst Demo</h1>
    <div>
      <h2>Data</h2>
      <data>
        {JSON.stringify(data)}
      </data>
    </div>
    <div className='content'>
      <label style={{ width: "100%", maxHeight: "200px" }}>{detail}</label>
      <SunburstSVG radius={200} data={convertedData} centerColor='blue' getSegments={getSegments} mouseEnterEvent={mouseEnterHandler} mouseLeaveEvent={mouseLeaveHandler} />
    </div>
  </div>
  )
}

export default App
