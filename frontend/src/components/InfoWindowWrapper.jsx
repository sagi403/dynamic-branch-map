import { InfoWindowF } from "@react-google-maps/api";
import InfoWindowContent from "./InfoWindowContent.jsx";
import PropTypes from "prop-types";
import { memo } from "react";

const InfoWindowWrapper = ({ selectedMarker, setSelectedMarker }) => {
  if (!selectedMarker) return null;

  return (
    <InfoWindowF
      position={{
        lat: selectedMarker.attributes.latitude,
        lng: selectedMarker.attributes.longitude,
      }}
    >
      <InfoWindowContent
        branch={selectedMarker}
        onClose={() => setSelectedMarker(null)}
        selectedMarker={selectedMarker}
      />
    </InfoWindowF>
  );
};

InfoWindowWrapper.propTypes = {
  selectedMarker: PropTypes.object,
  setSelectedMarker: PropTypes.func,
};

const MemoizedInfoWindowWrapper = memo(InfoWindowWrapper);
export default MemoizedInfoWindowWrapper;
