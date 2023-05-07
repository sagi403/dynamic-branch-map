import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBranchList } from "../fetchers/getBranchList";

const MapPage = () => {
  const [branches, setBranches] = useState([]);
  const location = useLocation();
  const mapRef = useRef(null);

  const selectedPlace = new URLSearchParams(location.search).get("location");

  const { data, error, refetch } = useQuery(["branches"], getBranchList, {
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setBranches(data);
    }
  }, [data]);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API not loaded!");
      return;
    }

    if (!selectedPlace) return;

    const request = {
      query: selectedPlace,
      fields: ["geometry"],
    };

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });

    new window.google.maps.places.PlacesService(map).findPlaceFromQuery(
      request,
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          map.setCenter(results[0].geometry.location);
        }
      }
    );
  }, [location]);

  return (
    <div>
      <h1>Map Page</h1>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapPage;
