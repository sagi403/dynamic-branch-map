import { GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

const Map = ({ location, setVisibleMarkers, markerPositions }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(map => setMap(map), []);

  useEffect(() => {
    const fetchPosition = async () => {
      if (location) {
        const position = await addressToCoordinates(location);
        setMarkerPosition(position);
      }
    };

    fetchPosition();
  }, [location]);

  const isMarkerVisible = (markerPosition, mapBounds) => {
    return (
      markerPosition.lat >= mapBounds.south &&
      markerPosition.lat <= mapBounds.north &&
      markerPosition.lng >= mapBounds.west &&
      markerPosition.lng <= mapBounds.east
    );
  };

  const updateVisibleMarkers = () => {
    if (!map) return;

    const mapBoundsObj = map.getBounds();
    if (!mapBoundsObj) return;

    const mapBounds = mapBoundsObj.toJSON();
    const newVisibleMarkers = markerPositions.filter(marker => {
      const lat = marker.attributes.latitude;
      const lng = marker.attributes.longitude;

      return isMarkerVisible({ lat, lng }, mapBounds);
    });
    setVisibleMarkers(newVisibleMarkers);
  };

  return (
    <GoogleMap
      zoom={10}
      center={markerPosition}
      mapContainerClassName="w-full h-screen"
      onIdle={updateVisibleMarkers}
      onLoad={onLoad}
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
  setVisibleMarkers: PropTypes.func,
  markerPositions: PropTypes.array,
};

const MemoizedMap = memo(Map);
export default MemoizedMap;
