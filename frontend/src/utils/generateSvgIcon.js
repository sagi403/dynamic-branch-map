import { idToColor } from "./idToColor";

export function generateSvgIcon(marker) {
  const markerColor = idToColor(marker.id);
  const borderColor = "#000000"; // Change this value to the desired border color
  const borderWidth = 2; // Change this value to the desired border width

  return {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="12" fill="${markerColor}"/>
          <circle cx="12" cy="12" r="11" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}"/>
        </svg>`),
    scaledSize: new window.google.maps.Size(32, 32),
  };
}
