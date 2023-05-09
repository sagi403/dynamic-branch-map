import { memo } from "react";
import { MarkerF } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { generateSvgIcon } from "../utils/generateSvgIcon";

const VisibleMarkersWrapper = ({ visibleMarkers, setSelectedMarker }) => {
  if (!visibleMarkers) return null;

  return visibleMarkers.map((marker, index) => {
    return (
      <MarkerF
        key={marker.id}
        position={{
          lat: marker.attributes.latitude,
          lng: marker.attributes.longitude,
        }}
        label={{
          text: (index + 1).toString(),
          fontWeight: "bold",
        }}
        icon={generateSvgIcon(marker)}
        onClick={() => setSelectedMarker(marker)}
      />
    );
  });
};

VisibleMarkersWrapper.propTypes = {
  visibleMarkers: PropTypes.array,
  setSelectedMarker: PropTypes.func,
};

const MemoizedVisibleMarkersWrapper = memo(VisibleMarkersWrapper);
export default MemoizedVisibleMarkersWrapper;
