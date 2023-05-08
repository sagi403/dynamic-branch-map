import PropTypes from "prop-types";
import { memo, useEffect } from "react";

const InfoWindowContent = ({
  branch,
  onClose,
  selectedMarker,
  setSelectedMarker,
}) => {
  const { name, address, phone_number, opening_hours } = branch.attributes;

  const formattedOpeningHours = opening_hours
    .split(", ")
    .map((hours, index) => <li key={index}>{hours}</li>);

  useEffect(() => {
    if (selectedMarker) {
      document.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedMarker]);

  const handleKeyUp = e => {
    if (e.key === "Escape" && selectedMarker) {
      setSelectedMarker(null);
    }
  };

  return (
    <div className="text-sm relative">
      <img
        src="https://via.placeholder.com/300x200"
        alt={name}
        className="w-full h-40 object-cover mb-2"
      />
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="mb-1">{address}</p>
      <p className="mb-1">Phone: {phone_number}</p>
      <h4 className="font-bold mb-1">Opening Hours:</h4>
      <ul className="list-none p-0">{formattedOpeningHours}</ul>

      <button
        className="absolute bottom-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full py-1 px-2"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

InfoWindowContent.propTypes = {
  branch: PropTypes.object,
  onClose: PropTypes.func,
  selectedMarker: PropTypes.object,
  setSelectedMarker: PropTypes.func,
};

const MemoizedInfoWindowContent = memo(InfoWindowContent);
export default MemoizedInfoWindowContent;
