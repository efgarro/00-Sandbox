import * as React from 'react';
import Heightgraph from './Heightgraph';

const App = () => {
  const data = [
    {
      properties: {
        label: 'Route 1',
        summary: 'Main Route',
      },
      features: [
        {
          geometry: {
            coordinates: [
              [-122.4, 37.8, 100],
              [-122.3, 37.9, 150],
              [-122.2, 38.0, 200],
            ],
          },
          properties: {
            attributeType: 'road',
          },
        },
      ],
    },
  ];

  return (
    <Heightgraph
      data={data}
      options={{
        width: 900,
        height: 350,
        expand: true,
        expandControls: true,
      }}
    />
  );
};

export default App;