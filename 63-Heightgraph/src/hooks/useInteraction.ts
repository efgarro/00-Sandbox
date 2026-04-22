import { useCallback } from 'react';
import { select, selectAll, mouse } from 'd3-selection';
import { drag } from 'd3-drag';
import { symbol, symbolTriangle } from 'd3-shape';
import { format } from 'd3-format';
import { bisector } from 'd3-array';
import { HeightgraphState, Geometry } from '../types/heightgraph.types';
import { TEXT_DISTANCE, LEGEND_RECT_SIZE, LEGEND_SPACING } from '../utils/constants';

interface InteractionConfig {
  container: HTMLDivElement | null;
  svgWidth: number;
  svgHeight: number;
  width: number;
  height: number;
  margins: { top: number; right: number; bottom: number; left: number };
}

export const useInteraction = (state: HeightgraphState) => {
  const createFocus = useCallback((svg: any, config: InteractionConfig) => {
    const boxPosition = state.elevationBounds.min;

    const focus = svg.append('g').attr('class', 'focusbox');

    // Background box
    focus
      .append('rect')
      .attr('x', 3)
      .attr('y', -state.yScale(boxPosition))
      .attr('display', 'none');

    // Text lines
    const distanceLine = focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.yScale(boxPosition) + TEXT_DISTANCE)
      .attr('id', 'heightgraph.distance')
      .text('Distance:');

    focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.yScale(boxPosition) + 2 * TEXT_DISTANCE)
      .attr('id', 'heightgraph.height')
      .text('Elevation:');

    focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.yScale(boxPosition) + 3 * TEXT_DISTANCE)
      .attr('id', 'heightgraph.blockdistance')
      .text('Segment length:');

    focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.yScale(boxPosition) + 4 * TEXT_DISTANCE)
      .attr('id', 'heightgraph.type')
      .text('Type:');

    // Focus line
    const focusLineGroup = svg.append('g').attr('class', 'focusLine');
    focusLineGroup
      .append('line')
      .attr('y1', 0)
      .attr('y2', state.yScale(state.elevationBounds.min));

    return { focus, focusLineGroup, distanceLine };
  }, [state]);

  const createLegend = useCallback((svg: any, categoryIdx: number) => {
    const category = state.categories[categoryIdx];
    if (!category) return;

    const legendData = Object.values(category.legend);
    const legend = svg
      .selectAll('.legend')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .style('display', 'none');

    legend
      .append('rect')
      .attr('class', 'legend-rect')
      .attr('x', 15)
      .attr('y', 6 * 6)
      .attr('width', LEGEND_RECT_SIZE)
      .attr('height', LEGEND_RECT_SIZE)
      .style('stroke', 'black')
      .style('fill', (d: any) => d.color);

    legend
      .append('text')
      .attr('class', 'legend-text')
      .attr('x', 30)
      .attr('y', 6 * 7)
      .text((d: any) => d.text);
  }, [state]);

  const findItemForX = useCallback((x: number): number => {
    const bisect = bisector((d: Geometry) => d.position).left;
    const xInvert = state.xScale.invert(x);
    return bisect(state.areasFlattened, xInvert);
  }, [state]);

  return { createFocus, createLegend, findItemForX };
};