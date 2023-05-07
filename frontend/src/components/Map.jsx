import { GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

const Map = ({ location }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    const fetchPosition = async () => {
      if (location) {
        const position = await addressToCoordinates(location);
        setMarkerPosition(position);
      }
    };

    fetchPosition();
  }, [location]);

  return (
    <GoogleMap
      zoom={15}
      center={markerPosition}
      mapContainerClassName="w-full h-screen"
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

const addressToCoordinates = async address => {
  const results = await getGeocode({ address });
  const { lat, lng } = await getLatLng(results[0]);

  return { lat, lng };
};

Map.propTypes = {
  location: PropTypes.string,
};

const MemoizedMap = memo(Map);
export default MemoizedMap;
