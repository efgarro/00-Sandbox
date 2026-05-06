import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "d3-transition";
import { useLeafletContext } from "@react-leaflet/core";
import { type FeatureCollection } from "geojson";

const TrailLayer = ({ trailData }: { trailData: FeatureCollection }) => {
  const context = useLeafletContext();
  useEffect(() => {
    // Render GeoJSON data
    const trail = L.geoJSON(trailData);
    const container = context.layerContainer || context.map;
    container.addLayer(trail);
    // Cleanup on unmount
    return () => container.removeLayer(trail);
  }, []);

  return null;
};

export default TrailLayer;
