import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import {
  HeightgraphData,
  HeightgraphOptions,
  HeightgraphState,
} from "./types/heightgraph.types";
import { useDataPreparer } from "./hooks/useDataPreparer";
import { useD3Scales } from "./hooks/useD3Scales";
import { useD3Chart } from "./hooks/useD3Chart";
import { useInteraction } from "./hooks/useInteraction";
import {
  DEFAULT_OPTIONS,
  DEFAULT_TRANSLATION,
} from "../src/utilities/heightgraph.constants";
import { getTranslation } from "../src/utilities/heightgraph.translations";
import "./Heightgraph.css";

interface HeightgraphProps {
  data: HeightgraphData[];
  options?: HeightgraphOptions;
  className?: string;
}

export const Heightgraph: React.FC<HeightgraphProps> = ({
  data,
  options = {},
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(options.expand !== false);

  // Merge options with defaults
  const mergedOptions: Required<HeightgraphOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
    margins: { ...DEFAULT_OPTIONS.margins, ...options.margins },
  };

  // State management
  const stateRef = useRef<HeightgraphState>({
    categories: [],
    areasFlattened: [],
    elevations: [],
    coordinates: [],
    cumulatedDistances: [0],
    totalDistance: 0,
    elevationBounds: { min: 0, max: 0 },
    xScale: null,
    yScale: null,
    dragCache: { start: null, end: null },
    gotDragged: false,
    dragStartCoords: null,
    dragCurrentCoords: null,
    selectedAttributeIdx: mergedOptions.selectedAttributeIdx,
  });

  const state = stateRef.current;
  const { prepareData, calculateElevationBounds } = useDataPreparer(state);
  const { createScales } = useD3Scales(state);
  const { drawAreas, drawBorderTopLine, appendGrid } = useD3Chart(state);
  const { createFocus, createLegend, findItemForX } = useInteraction(state);

  const svgWidth =
    mergedOptions.width -
    mergedOptions.margins.left -
    mergedOptions.margins.right;
  const svgHeight =
    mergedOptions.height -
    mergedOptions.margins.top -
    mergedOptions.margins.bottom;

  const renderChart = () => {
    if (!containerRef.current) return;

    // Clear previous chart
    const container = select(containerRef.current);
    container.selectAll("svg").remove();

    // Create SVG
    const svg = container
      .append("svg")
      .attr("class", "heightgraph-container")
      .attr("width", mergedOptions.width)
      .attr("height", mergedOptions.height)
      .append("g")
      .attr(
        "transform",
        `translate(${mergedOptions.margins.left},${mergedOptions.margins.top})`,
      );

    // Create scales and axes
    const { xAxis, yAxis } = createScales({
      svgWidth,
      svgHeight,
      margins: mergedOptions.margins,
      xTicks: mergedOptions.xTicks,
      yTicks: mergedOptions.yTicks,
    });

    // Draw grid and axes
    appendGrid(svg, svgWidth, svgHeight, xAxis, yAxis);

    // Draw areas
    const categoryIdx = state.selectedAttributeIdx;
    const areas = state.categories[categoryIdx]?.geometries || [];
    drawAreas(svg, areas, categoryIdx, mergedOptions.graphStyle);

    // Draw border top line
    drawBorderTopLine(svg);

    // Create interactive elements
    createFocus(svg, {
      container: containerRef.current,
      svgWidth,
      svgHeight,
      width: mergedOptions.width,
      height: mergedOptions.height,
      margins: mergedOptions.margins,
    });

    // Create legend
    createLegend(svg, categoryIdx);
  };

  useEffect(() => {
    if (!data || data.length === 0) return;

    prepareData(data, mergedOptions.mappings);
    calculateElevationBounds();
    renderChart();
  }, [data, mergedOptions.mappings, prepareData, calculateElevationBounds]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    mergedOptions.expandCallback?.(!isExpanded);
  };

  return (
    <div className={`heightgraph ${className}`} ref={containerRef}>
      {mergedOptions.expandControls && (
        <div className="heightgraph-controls">
          <button
            onClick={handleToggleExpand}
            className="heightgraph-toggle-btn"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      )}
      {/* SVG will be appended here by D3 */}
    </div>
  );
};

export default Heightgraph;
