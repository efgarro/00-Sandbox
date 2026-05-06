// import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import  { type FeatureCollection } from "geojson";

import geojsonData from "../data/monteverde-trail-5km.json";

const trailData = geojsonData as FeatureCollection;

import TrailLayer from "./TrailLayer";
import TrailElevationChart from "./TrailElevationChart";
import { TrailContextProvider } from "./context/TrailContextProvider";

const LeafletMap = () => {
  return (
    <>
      <TrailContextProvider>
        <MapContainer
          center={[10.3175, -84.8077]}
          zoom={11}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
          <TrailLayer trailData={trailData} />
        </MapContainer>
        <TrailElevationChart geoJsonData={trailData} />
      </TrailContextProvider>
    </>
  );
};

export default LeafletMap;
