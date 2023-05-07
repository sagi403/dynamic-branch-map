import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import usePlacesAutocomplete from "use-places-autocomplete";

const PlacesAutocomplete = ({ selectedPlace, setSelectedPlace }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [containerMouseDown, setContainerMouseDown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    if (selectedPlace !== value) {
      setSelectedPlace("");
    }
  }, [value]);

  const handleSuggestionClick = address => {
    setValue(address, false);
    clearSuggestions();
    setSelectedPlace(address);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < data.length - 1 ? prev + 1 : prev));
    } else if (e.key === "Enter" && highlightedIndex > -1) {
      e.preventDefault();
      handleSuggestionClick(data[highlightedIndex].description);
    }
  };

  return (
    <div
      onMouseDown={() => setContainerMouseDown(true)}
      onMouseUp={() => setContainerMouseDown(false)}
    >
      <input
        type="text"
        placeholder="Enter Address or Place"
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-cyan-500"
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        onKeyDown={handleKeyDown}
        onBlur={() => !containerMouseDown && setShowSuggestions(false)}
        onFocus={() => setShowSuggestions(true)}
      />
      {status === "OK" && showSuggestions && (
        <div className="relative">
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-sm">
            {data.map(({ place_id, description }, index) => (
              <div
                key={place_id}
                className={`px-4 py-2 cursor-pointer ${
                  index === highlightedIndex ? "bg-gray-200" : ""
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(-1)}
                onClick={() => handleSuggestionClick(description)}
              >
                {description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

PlacesAutocomplete.propTypes = {
  setSelectedPlace: PropTypes.func,
  selectedPlace: PropTypes.string,
};

export default PlacesAutocomplete;
