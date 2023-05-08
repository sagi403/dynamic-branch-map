import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";
import InfoWindowContent from "./InfoWindowContent.jsx";
import { generateSvgIcon } from "../utils/generateSvgIcon";

const Map = ({
  location,
  visibleMarkers,
  setVisibleMarkers,
  markerPositions,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
      }}
    >
      {markerPosition && <Marker position={markerPosition} />}
      {visibleMarkers &&
        visibleMarkers.map((marker, index) => {
          return (
            <Marker
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
              onClick={() => {
                setSelectedMarker(marker);
                map.panTo({
                  lat: marker.attributes.latitude,
                  lng: marker.attributes.longitude,
                });
              }}
            />
          );
        })}
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.attributes.latitude,
            lng: selectedMarker.attributes.longitude,
          }}
        >
          <InfoWindowContent
            branch={selectedMarker}
            onClose={() => setSelectedMarker(null)}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
        </InfoWindow>
      )}
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
};

const MemoizedMap = memo(Map);
export default MemoizedMap;
