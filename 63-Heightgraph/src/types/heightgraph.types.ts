export interface LatLng {
  lat: number;
  lng: number;
}

export interface Geometry {
  altitude: number;
  position: number;
  x: number;
  y: number;
  latlng: LatLng;
  type: string;
  areaIdx: number;
}

export interface Attribute {
  type: string;
  text: string;
  color: string;
}

export interface Category {
  info: {
    id: number;
    text: string;
  };
  distances: number[];
  attributes: Attribute[];
  geometries: Geometry[][];
  legend: Record<string, Attribute>;
}

export interface ElevationBounds {
  min: number;
  max: number;
}

export interface HeightgraphOptions {
  width?: number;
  height?: number;
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  mappings?: Record<string, any>;
  expand?: boolean;
  expandControls?: boolean;
  translation?: Record<string, string>;
  expandCallback?: (expanded: boolean) => void;
  chooseSelectionCallback?: (id: number, type: any) => void;
  selectedAttributeIdx?: number;
  xTicks?: number;
  yTicks?: number;
  highlightStyle?: Record<string, any>;
  graphStyle?: Record<string, any>;
}

export interface HeightgraphData {
  properties: {
    label?: string;
    summary: string;
  };
  features: Array<{
    geometry: {
      coordinates: Array<[number, number, number]>;
    };
    properties: {
      attributeType: string;
    };
  }>;
}

export interface HeightgraphState {
  categories: Category[];
  areasFlattened: Geometry[];
  elevations: number[];
  coordinates: LatLng[];
  cumulatedDistances: number[];
  totalDistance: number;
  elevationBounds: ElevationBounds;
  xScale: any;
  yScale: any;
  dragCache: {
    start: number[] | null;
    end: number[] | null;
  };
  gotDragged: boolean;
  dragStartCoords: number[] | null;
  dragCurrentCoords: number[] | null;
  selectedAttributeIdx: number;
}