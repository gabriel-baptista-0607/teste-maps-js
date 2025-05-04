import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useGoogleMap,
} from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import "./App.css";

const containerStyle = {
  width: "700px",
  height: "500px",
};

const center = {
  lat: -23.5506,
  lng: -46.6333,
};

const PlaceDetails = ({ placeId }) => {
  const map = useGoogleMap();
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    if (map && placeId) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        placeId: placeId,
        fields: ["name", "formatted_address", "rating", "website", "photos"],
      };

      service.getDetails(request, (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          setPlaceDetails(place);
          console.log("Place Details: ", place);
        } else {
          console.error("Could not retrieve place details: ", status);
        }
      });
    }
  }, [map, placeId]);

  if (!placeDetails) {
    return <div>Carregando detalhes do local...</div>;
  }

  return (
    <div>
      <h3>{placeDetails.name}</h3>
      <p>Address: {placeDetails.formatted_address}</p>
      {placeDetails.rating && <p>Rating: {placeDetails.rating}</p>}
      {placeDetails.website && (
        <p>
          Website: <a href={placeDetails.website}>{placeDetails.website}</a>
        </p>
      )}
      {placeDetails.photos && placeDetails.photos.length > 0 && (
        <div>
          <h4>Photos: </h4>
          {placeDetails.photos.slice(0, 3).map((photo, index) => (
            <img
              key={index}
              src={photo.getUrl({ maxWidth: 100, maxHeight: 100 })}
              alt={placeDetails.name}
              style={{ margin: "5px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function MyMapComponent() {
  const [map, setMap] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(
    "ChIJQ-54nl-G3JQR0aGXz7wM4w"
  );

  const onLoad = useCallback(function callback(m) {
    const bounds = new window.google.maps.LatLngBounds(center);
    m.fitBounds(bounds);
    setMap(map);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
    >
      {selectedPlaceId && <PlaceDetails placeId={selectedPlaceId} />}
      <Marker position={center} />
      <SearchBar />
    </GoogleMap>
  );
}

function App() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBzNfKryut_MzMYsmxEQnYAWinR8SKsnZk"
      libraries={["places"]}
    >
      <MyMapComponent />
    </LoadScript>
  );
}

export default App;
