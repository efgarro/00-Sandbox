import {
  schemeAccent,
  schemeDark2,
  schemeSet2,
  schemeCategory10,
  schemeSet3,
  schemePaired,
} from 'd3-scale-chromatic';

export const DEFAULT_TRANSLATION = {
  distance: 'Distance',
  elevation: 'Elevation',
  segment_length: 'Segment length',
  type: 'Type',
  legend: 'Legend',
};

export const DEFAULT_OPTIONS = {
  width: 800,
  height: 280,
  margins: {
    top: 10,
    right: 30,
    bottom: 55,
    left: 50,
  },
  expand: true,
  expandControls: true,
  selectedAttributeIdx: 0,
  highlightStyle: { color: 'red' },
  graphStyle: {},
};

export const COLOR_SCHEMES = [
  schemeAccent,
  schemeDark2,
  schemeSet2,
  schemeCategory10,
  schemeSet3,
  schemePaired,
];

export const TEXT_DISTANCE = 15;
export const LEGEND_RECT_SIZE = 7;
export const LEGEND_SPACING = 7;
export const EXACT_MATCH_ROUNDING = 1.1 / 111111;