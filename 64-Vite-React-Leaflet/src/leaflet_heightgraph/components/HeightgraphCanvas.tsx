import React from 'react'

interface HeightgraphCanvasProps {
  svgRef: React.RefObject<SVGSVGElement>
  isExpanded: boolean
  width: number
  height: number
}

export const HeightgraphCanvas: React.FC<HeightgraphCanvasProps> = ({
  svgRef,
  isExpanded,
  width,
  height
}) => (
  <svg
    ref={svgRef}
    style={{
      width: isExpanded ? width : 0,
      height: isExpanded ? height : 0,
      display: isExpanded ? 'block' : 'none',
      overflow: 'visible'
    }}
  />
)