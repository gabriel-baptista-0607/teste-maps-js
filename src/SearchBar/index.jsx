import React, { useRef, useEffect } from "react";
import { useGoogleMap } from "@react-google-maps/api";

const SearchBar = () => {
  const inputRef = useRef(null);
  const map = useGoogleMap();

  useEffect(() => {
    if (map && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

      autocomplete.bindTo("bounds", map);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.log("No details available for input: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        console.log("Selected place :", place);
      });
    }
  }, [map]);

  return (
    <div
      style={{ position: "absolute", top: "10px", left: "200px", zIndex: 1 }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a place"
        style={{
          border: "1px solid white",
          borderRadius: "4px",
          width: "300px",
          height: "38px",
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
        }}
      />
    </div>
  );
};

export default SearchBar;
