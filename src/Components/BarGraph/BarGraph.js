import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand,scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import {LegendOrdinal} from '@visx/legend'
import { ScaleSVG } from '@visx/responsive';
import './BarGraph.css'

function BarGraph({data}) {

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
  })
  function handleMouseOver (event, datum){
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData:datum
    });
  };

const width = 400;
const height = 400;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

const yMax = height - margin.top - margin.bottom;

const x = d => d.month;
const y = d => +d.value * 100;

const xScale = scaleBand({
  range: [0, 395],
  round: true,
  domain: data.map(x),
  padding: 0.1,
});
const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(y))],
});

const compose = (scale, accessor) => data => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

const legendData = scaleOrdinal({
  domain: data.map(item=>item.month),
  range: data.map(item=>item.color),
});

  if(!data.length){
    return <h1>Loading...</h1>
  }
  return (
    <div className='graphContainer'>
    <ScaleSVG width={400} height={300}>
      <svg ref={containerRef}  width={width} height={height} className='graph'>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Group key={`bar-${i}`} 
                onMouseOver={(event)=>handleMouseOver(event,`${d.month} ${d.value} posts`)}
                onMouseOut={hideTooltip}>
              <Bar
                x={xPoint(d)}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth()}
                fill={d.color}
              />
            </Group>
          );
        })}
      </svg>
      </ScaleSVG>
      {tooltipOpen && (
            <TooltipInPortal
            className='toolTip'
            key={Math.random()}
            left={tooltipLeft}
            top={tooltipTop}
          >
          {tooltipData}
          </TooltipInPortal>
          )}
      <LegendOrdinal
        scale={legendData}
        shape="circle"
      />
    </div>
  );
}


export default BarGraph