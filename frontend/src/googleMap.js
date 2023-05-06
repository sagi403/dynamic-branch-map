let map;
let infowindow;

function initMap(mapRef, selectedPlace) {
  if (!mapRef) return;
  infowindow = new window.google.maps.InfoWindow();

  map = new window.google.maps.Map(mapRef, {
    center: { lat: 0, lng: 0 },
    zoom: 15,
  });

  const request = {
    query: selectedPlace,
    fields: ["geometry"],
  };

  new window.google.maps.places.PlacesService(map).findPlaceFromQuery(
    request,
    (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter(results[0].geometry.location);
      }
    }
  );
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new window.google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  window.google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;
window.createMarker = createMarker;
