import { GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";
import InfoWindowWrapper from "./InfoWindowWrapper";
import VisibleMarkersWrapper from "./VisibleMarkersWrapper";

const Map = ({
  location,
  visibleMarkers,
  setVisibleMarkers,
  markerPositions,
  selectedMarker,
  setSelectedMarker,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(map => setMap(map), []);

  const handleMarkerPicked = useCallback(
    marker => {
      if (!map || !marker) return;

      map.panTo({
        lat: marker.attributes.latitude,
        lng: marker.attributes.longitude,
      });
    },
    [map]
  );

  useEffect(() => {
    handleMarkerPicked(selectedMarker);
  }, [handleMarkerPicked, selectedMarker]);

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
    if (!map || !markerPositions) return;

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
      options={{
        draggable: !selectedMarker,
        scrollwheel: !selectedMarker,
        clickableIcons: !selectedMarker,
      }}
    >
      {markerPosition && <Marker position={markerPosition} />}
      <VisibleMarkersWrapper
        visibleMarkers={visibleMarkers}
        setSelectedMarker={setSelectedMarker}
      />
      <InfoWindowWrapper
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
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
  visibleMarkers: PropTypes.array,
  setVisibleMarkers: PropTypes.func,
  markerPositions: PropTypes.array,
  selectedMarker: PropTypes.object,
  setSelectedMarker: PropTypes.func,
};

const MemoizedMap = memo(Map);
export default MemoizedMap;
