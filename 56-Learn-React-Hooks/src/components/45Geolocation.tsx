import * as React from "react";

import useGeolocation from "../hooks/45useGeolocation";
import useOnlineStatus from "../hooks/51useOnlineStatus";

function Location() {
  const geoState = useGeolocation({
    // enableHighAccuracy: false, // Use GPS if available
    // timeout: 5000, // Timeout after 5 seconds
    // maximumAge: 0, // Don't use cached location
  });
  const isOnline = useOnlineStatus();

  if (geoState.loading) {
    return <p>loading... (you may need to enable permissions)</p>;
  }

  if (!isOnline) {
    return <p>User is offline</p>;
  }

  if (geoState.error) {
    return <p>Enable permissions to access your location data</p>;
  }

  return (
    <>
      <p>Geoloc</p>
      <p>{`latitude: ${geoState.coords.latitude}, longitude: ${geoState.coords.longitude}`}</p>
      <p>Internet Access Status</p>
      <p>{`Connected: ${isOnline}`}</p>
    </>
  );
}

export default function HookApp() {
  return (
    <section>
      <h1>useGeolocation</h1>
      <Location />
    </section>
  );
}
