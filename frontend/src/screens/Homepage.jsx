import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "../components/PlacesAutocomplete";

const Homepage = () => {
  const [selectedPlace, setSelectedPlace] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/map?location=${selectedPlace}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">The WWW Corp</h1>
      <h2 className="text-2xl mb-4">Search for branch</h2>
      <div className="w-full max-w-md">
        <PlacesAutocomplete
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />
        <div className="flex justify-center mt-4">
          <button
            className={`px-10 py-2 bg-cyan-500 text-white font-bold rounded focus:outline-none ${
              !selectedPlace && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSearch}
            disabled={!selectedPlace}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
