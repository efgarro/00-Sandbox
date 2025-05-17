import * as React from "react";

import { GeolocationPosition, IGeoState } from "../types/hookTypes";

export default function useGeolocation(options = {}) {
  const geoStateDefaultValues: IGeoState = {
    loading: true,
    error: null,
    coords: {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: null,
  };

  const [geoState, setGeoState] = React.useState(geoStateDefaultValues);
  const optionsRef = React.useRef(options);
  const onEvent = (position: GeolocationPosition) => {
    console.log(position.coords);
    setGeoState({
      loading: false,
      error: null,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
      },
      timestamp: position.timestamp,
    });
  };

  const onEventError = (error: any) => {
    console.log(error);
    setGeoState((s: IGeoState) => {
      return { ...s, loading: false, error: error };
    });
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return geoState;
}
