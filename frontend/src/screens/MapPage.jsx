import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { getBranchList } from "../fetchers/getBranchList";
import Map from "../components/Map.jsx";
import BranchList from "../components/BranchList";
import PlacesAutocomplete from "../components/PlacesAutocomplete";

const MapPage = () => {
  const [distances, setDistances] = useState([]);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const selectedPlace =
    new URLSearchParams(location.search).get("location") || "Luxembourg";

  const { data, isLoading, error } = useQuery(["branches"], getBranchList, {
    staleTime: 5000,
  });

  const handleSearch = () => {
    navigate(`/map?location=${newLocation}`);
  };

  const getDistances = useCallback(async () => {
    if (!selectedPlace || visibleMarkers.length === 0) return;

    const service = new window.google.maps.DistanceMatrixService();

    const destinations = visibleMarkers.map(
      branch => branch.attributes.address
    );

    service.getDistanceMatrix(
      {
        origins: [selectedPlace],
        destinations: destinations,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          setDistances(
            response.rows[0].elements.map(element =>
              element.status === "OK" ? element.distance.text : "N/A"
            )
          );
        } else {
          console.error("DistanceMatrixService failed with status:", status);
        }
      }
    );
  }, [selectedPlace, visibleMarkers]);

  useEffect(() => {
    getDistances();
  }, [getDistances]);

  return (
    <div className="md:flex md:h-screen">
      <div className="lg:w-1/4 md:w-1/3 w-full p-4 h-full overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">The WWW Corp</h1>
        <div className="flex mb-4">
          <PlacesAutocomplete
            selectedPlace={newLocation}
            setSelectedPlace={setNewLocation}
            classes="rounded-l"
          />
          <button
            className={`px-4 py-2 bg-cyan-500 text-white font-bold rounded-r focus:outline-none ${
              !newLocation && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSearch}
            disabled={!newLocation}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        <ul className="list-none p-0">
          {!isLoading && (
            <BranchList
              visibleMarkers={visibleMarkers}
              setSelectedMarker={setSelectedMarker}
              distances={distances}
            />
          )}
        </ul>
      </div>

      <div className="lg:w-3/4 md:w-2/3 w-full h-screen">
        <Map
          location={selectedPlace}
          visibleMarkers={visibleMarkers}
          setVisibleMarkers={setVisibleMarkers}
          markerPositions={data}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
        />
      </div>
    </div>
  );
};

export default MapPage;
