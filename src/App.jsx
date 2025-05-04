import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./App.css";

const containerStyle = {
  width: "1000px",
  height: "500px",
};

const center = {
  lat: -23.5506,
  lng: -46.6333,
};

function MyMapComponent() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(m) {
      const bounds = new window.google.maps.LatLngBounds(center);
      m.fitBounds(bounds);
      setMap(m);
    },
    [map]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCdj8J66KnkQnCVAGwy1a_PVmcT0mLW23Q">
      <MyMapComponent />
    </LoadScript>
  );
}

export default App;
