import { useCallback } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { min as d3Min, max as d3Max } from 'd3-array';
import {
  HeightgraphData,
  HeightgraphState,
  Category,
  Geometry,
  Attribute,
  ElevationBounds,
} from '../types/heightgraph.types';
import { COLOR_SCHEMES } from '../utilities/heightgraph.constants';
import { calculateDistance, randomNumber } from '../utilities/heightgraph.math';

export const useDataPreparer = (state: HeightgraphState) => {
  const prepareData = useCallback(
    (
      data: HeightgraphData[],
      mappings?: Record<string, any>
    ) => {
      state.coordinates = [];
      state.elevations = [];
      state.cumulatedDistances = [0];
      state.categories = [];

      const randomNum = randomNumber(COLOR_SCHEMES.length - 1);
      const colorScale = scaleOrdinal(COLOR_SCHEMES[randomNum]);

      data.forEach((routeData, y) => {
        let cumDistance = 0;
        state.categories[y] = {
          info: {
            id: y,
            text: routeData.properties.label || routeData.properties.summary,
          },
          distances: [],
          attributes: [],
          geometries: [],
          legend: {},
        };

        let cnt = 0;
        const usedColors: Record<string, string> = {};
        const isMappingFunction =
          mappings &&
          typeof mappings[routeData.properties.summary] === 'function';

        routeData.features.forEach((feature, i) => {
          const coordsLength = feature.geometry.coordinates.length;
          const attributeType = feature.properties.attributeType;

          let text: string, color: string;

          if (!mappings) {
            if (attributeType in usedColors) {
              text = attributeType;
              color = usedColors[attributeType];
            } else {
              text = attributeType;
              color = colorScale(i.toString());
              usedColors[attributeType] = color;
            }
          } else {
            if (isMappingFunction) {
              const result = mappings[routeData.properties.summary](
                attributeType
              );
              text = result.text;
              color = result.color;
            } else {
              text = mappings[routeData.properties.summary][attributeType]
                .text;
              color = mappings[routeData.properties.summary][attributeType]
                .color;
            }
          }

          const attribute: Attribute = { type: attributeType, text, color };
          state.categories[y].attributes.push(attribute);

          if (!(attributeType in state.categories[y].legend)) {
            state.categories[y].legend[attributeType] = attribute;
          }

          const geometry: Geometry[] = [];

          feature.geometry.coordinates.forEach((coord, j) => {
            const altitude = coord[2];
            const ptA = { lat: coord[1], lng: coord[0] };

            if (j < coordsLength - 1) {
              const ptB = {
                lat: feature.geometry.coordinates[j + 1][1],
                lng: feature.geometry.coordinates[j + 1][0],
              };
              const ptDistance = calculateDistance(ptA, ptB) / 1000;
              cumDistance += ptDistance;

              if (y === 0) {
                state.elevations.push(altitude);
                state.coordinates.push(ptA);
                state.cumulatedDistances.push(cumDistance);
              }
              cnt += 1;
            } else if (
              j === coordsLength - 1 &&
              i === routeData.features.length - 1
            ) {
              if (y === 0) {
                state.elevations.push(altitude);
                state.coordinates.push(ptB);
              }
              cnt += 1;
            }

            let position: number;
            if (j === coordsLength - 1 && i < routeData.features.length - 1) {
              position = state.cumulatedDistances[cnt];
            } else {
              position = state.cumulatedDistances[cnt - 1];
            }

            geometry.push({
              altitude,
              position,
              x: ptA.lng,
              y: ptA.lat,
              latlng: ptA,
              type: text,
              areaIdx: i,
            });
          });

          state.categories[y].distances.push(cumDistance);
          state.categories[y].geometries.push(geometry);
        });

        if (y === data.length - 1) {
          state.totalDistance = cumDistance;
        }
      });
    },
    [state]
  );

  const calculateElevationBounds = useCallback(() => {
    const max = d3Max(state.elevations) || 0;
    const min = d3Min(state.elevations) || 0;
    const range = max - min;

    state.elevationBounds = {
      min: range < 10 ? min - 10 : min - 0.1 * range,
      max: range < 10 ? max + 10 : max + 0.1 * range,
    };
  }, [state]);

  return { prepareData, calculateElevationBounds };
};