import './App.css'
import SunburstSVG from './Components/SunburstSVG/SunburstSVG'
import SunburstViewItemTN from './Components/SunburstSVG/SunburstViewItemTN';
import SunburstViewItem from "./Models/SunburstViewItem";
import SunburstDataDTO from "./Models/SunburstDataDTO";
import { max, min, scaleLinear, HierarchyNode } from 'd3';
import { useState } from 'react';
import SunburstEvent from './Components/Sunburst/SunburstEvent';

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

  function summarize(item: HierarchyNode<SunburstViewItemTN>): string {
    return item.ancestors().map(x => x.data?.name ?? "?").reverse().join('.')
  }

  const mouseEnterHandler: SunburstEvent<SunburstViewItemTN> = (_: MouseEvent, d: HierarchyNode<SunburstViewItemTN>): void => { setDetail(summarize(d)); };

  const mouseLeaveHandler: SunburstEvent<SunburstViewItemTN> = () => { setDetail(undefined); };

  return (<div>
    <h1>React Sunburst Demo</h1>
    <div className='content'>
      <div className='data'>
        <h2>Data</h2>
        <data>
          {JSON.stringify(data)}
        </data>
      </div>
      <div className='sunburst-content'>
        <SunburstSVG radius={200} data={convertedData} centerColor='blue' getSegments={getSegments} mouseEnterEvent={mouseEnterHandler} mouseLeaveEvent={mouseLeaveHandler} />
        <label>{detail}</label>
      </div>
    </div>
  </div>
  )
}

export default App
