import { useCallback } from 'react';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { HeightgraphState } from '../types/heightgraph.types';

interface ScalesConfig {
  svgWidth: number;
  svgHeight: number;
  margins: { top: number; right: number; bottom: number; left: number };
  xTicks?: number;
  yTicks?: number;
}

export const useD3Scales = (state: HeightgraphState) => {
  const createScales = useCallback((config: ScalesConfig) => {
    const { svgWidth, svgHeight, xTicks, yTicks } = config;

    const xScale = scaleLinear()
      .range([0, svgWidth])
      .domain([0, state.totalDistance]);

    const yScale = scaleLinear()
      .range([svgHeight, 0])
      .domain([state.elevationBounds.min, state.elevationBounds.max]);

    const shortDist = state.totalDistance <= 10;

    const xAxis = axisBottom()
      .scale(xScale)
      .tickFormat((d: any) => format(shortDist ? '.2f' : '.0f')(d) + ' km')
      .ticks(xTicks ? Math.pow(2, xTicks) : Math.round(svgWidth / 75), 's');

    const yAxis = axisLeft()
      .scale(yScale)
      .tickFormat((d: any) => d + ' m')
      .ticks(yTicks ? Math.pow(2, yTicks) : Math.round(svgHeight / 30), 's');

    state.xScale = xScale;
    state.yScale = yScale;

    return { xScale, yScale, xAxis, yAxis };
  }, [state]);

  return { createScales };
};