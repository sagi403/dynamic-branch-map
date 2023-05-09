export const getDistances = async (selectedPlace, visibleMarkers, callback) => {
  if (!selectedPlace || visibleMarkers.length === 0) return;

  const service = new window.google.maps.DistanceMatrixService();

  const destinations = visibleMarkers.map(branch => branch.attributes.address);

  service.getDistanceMatrix(
    {
      origins: [selectedPlace],
      destinations: destinations,
      travelMode: "DRIVING",
    },
    (response, status) => {
      if (status === "OK") {
        const distances = response.rows[0].elements.map(element =>
          element.status === "OK" ? element.distance.text : "N/A"
        );
        callback(distances);
      } else {
        console.error("DistanceMatrixService failed with status:", status);
      }
    }
  );
};
