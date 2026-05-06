import React, { useState } from "react";

let TrailContext = React.createContext<ITrailContext>(null!); // returns a context object

export interface ITrailContext {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  chartDims: IChartDims;
  setChartDims: React.Dispatch<React.SetStateAction<IChartDims>>;
  chartMargins: IChartMargins;
  setChartMargins: React.Dispatch<React.SetStateAction<IChartMargins>>;
}

export interface IChartDims {
  width: number;
  height: number;
}
export interface IChartMargins {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

const defaultChartDims: IChartDims = {
  width: 750,
  height: 250,
};
const defaultChartMargins: IChartMargins = {
  marginTop: 750,
  marginRight: 250,
  marginBottom: 750,
  marginLeft: 250,
};

const [chartDims, setChartDims] = useState(defaultChartDims);
const [chartMargins, setChartMargins] = useState(defaultChartMargins);

export function TrailContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  let value: ITrailContext = {
    chartContainerRef,
    svgRef,
    chartDims,
    setChartDims,
    chartMargins,
    setChartMargins,
  };

  return <TrailContext value={value}>{children}</TrailContext>;
}

export function useTrailContext() {
  return React.useContext(TrailContext);
}
