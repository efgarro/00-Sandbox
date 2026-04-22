import { useCallback } from 'react';
import { select } from 'd3-selection';
import { area as d3Area, line, curveBasis, curveLinear } from 'd3-shape';
import { HeightgraphState, Geometry } from '../../src/types/heightgraph.types';

interface ChartConfig {
  container: HTMLDivElement | null;
  width: number;
  height: number;
  margins: { top: number; right: number; bottom: number; left: number };
  graphStyle: Record<string, any>;
}

export const useD3Chart = (state: HeightgraphState) => {
  const drawAreas = useCallback(
    (
      svg: any,
      areas: Geometry[][],
      categoryIdx: number,
      graphStyle: Record<string, any>
    ) => {
      state.areasFlattened = [].concat(...areas);

      areas.forEach((areaGeometry, eleIdx) => {
        const color =
          state.categories[categoryIdx].attributes[eleIdx]?.color || '#000';

        const areaPath = d3Area()
          .x((d: Geometry) => state.xScale(d.position))
          .y0(state.yScale.range()[0])
          .y1((d: Geometry) => state.yScale(d.altitude))
          .curve(curveLinear);

        svg
          .append('path')
          .attr('class', 'area')
          .attr('d', areaPath(areaGeometry))
          .attr('stroke', color)
          .attr('fill', color)
          .style('pointer-events', 'none');

        Object.entries(graphStyle).forEach(([key, value]) => {
          svg.selectAll('.area').style(key, value);
        });
      });
    },
    [state]
  );

  const drawBorderTopLine = useCallback(
    (svg: any) => {
      if (state.areasFlattened.length === 0) return;

      const borderTopLine = line()
        .x((d: Geometry) => state.xScale(d.position))
        .y((d: Geometry) => state.yScale(d.altitude))
        .curve(curveBasis);

      svg
        .append('path')
        .attr('d', borderTopLine(state.areasFlattened))
        .attr('class', 'border-top')
        .attr('stroke', '#333')
        .attr('stroke-width', 2)
        .style('fill', 'none');
    },
    [state]
  );

  const appendGrid = useCallback(
    (svg: any, svgWidth: number, svgHeight: number, xAxis: any, yAxis: any) => {
      const makeXAxis = () => select(svg.node()).selectAll('.x.axis');
      const makeYAxis = () => select(svg.node()).selectAll('.y.axis');

      // X-axis grid
      svg
        .append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${svgHeight})`)
        .call(
          xAxis
            .tickSize(-svgHeight, 0, 0)
            .ticks(Math.round(svgWidth / 75))
            .tickFormat('')
        );

      // Y-axis grid
      svg
        .append('g')
        .attr('class', 'grid')
        .call(
          yAxis
            .tickSize(-svgWidth, 0, 0)
            .ticks(Math.round(svgHeight / 30))
            .tickFormat('')
        );

      // X-axis
      svg
        .append('g')
        .attr('transform', `translate(0,${svgHeight})`)
        .attr('class', 'x axis')
        .call(xAxis);

      // Y-axis
      svg
        .append('g')
        .attr('transform', 'translate(-2,0)')
        .attr('class', 'y axis')
        .call(yAxis);
    },
    []
  );

  return { drawAreas, drawBorderTopLine, appendGrid };
};