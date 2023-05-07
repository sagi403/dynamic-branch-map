import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [location, setLocation] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [containerMouseDown, setContainerMouseDown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const autocompleteService =
      new window.google.maps.places.AutocompleteService();

    if (!location) {
      setSuggestions([]);
      selectedPlace && setSelectedPlace("");
      return;
    }

    if (selectedPlace !== location) {
      autocompleteService.getPlacePredictions({ input: location }, results => {
        results ? setSuggestions(results) : setSuggestions([]);
      });
      selectedPlace && setSelectedPlace("");
    }
  }, [location]);

  const handleSuggestionClick = suggestion => {
    setLocation(suggestion.description);
    setSelectedPlace(suggestion.description);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "Enter" && highlightedIndex > -1) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  const handleSearch = () => {
    navigate(`/map?location=${selectedPlace}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">The WWW Corp</h1>
      <h2 className="text-2xl mb-4">Search for branch</h2>
      <div className="w-full max-w-md">
        <div
          onMouseDown={() => setContainerMouseDown(true)}
          onMouseUp={() => setContainerMouseDown(false)}
        >
          <input
            type="text"
            placeholder="Enter Address or Place"
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-cyan-500"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => !containerMouseDown && setShowSuggestions(false)}
            onFocus={() => setShowSuggestions(true)}
          />
          {suggestions.length > 0 && showSuggestions && (
            <div className="relative">
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-sm">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.place_id}
                    className={`px-4 py-2 cursor-pointer ${
                      index === highlightedIndex ? "bg-gray-200" : ""
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
