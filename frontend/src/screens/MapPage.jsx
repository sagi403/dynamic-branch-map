import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
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
    <div className="flex">
      <div className="w-1/4 p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">The WWW Corp</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for branch"
            className="w-full px-4 py-2 border border-gray-300 rounded-l shadow-sm focus:outline-none focus:border-cyan-500"
          />
          <button className="px-4 py-2 bg-cyan-500 text-white font-bold rounded-r focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>

        <ul className="list-none p-0">
          {branches.length > 0 &&
            branches.map((branch, index) => (
              <li
                key={branch.id}
                className="py-3 border-b border-gray-300 relative hover:bg-gray-200"
              >
                <div className="flex items-center">
                  <span className="mx-3 font-bold text-lg">{index + 1}</span>
                  <div className="w-full">
                    <h2 className="font-bold">{branch.attributes.address}</h2>
                    <p>Distance: 15 km</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="w-3/4">
        <div ref={mapRef} style={{ width: "100%", height: "100vh" }}></div>
        {/* <div style={{ width: "100%", height: "100vh" }}></div> */}
      </div>
    </div>
  );
};

export default MapPage;
