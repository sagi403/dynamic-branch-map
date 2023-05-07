export function idToColor(id) {
  const hue = (id * 137.5) % 360; // Golden angle approximation
  return `hsl(${hue}, 50%, 60%)`; // Set the saturation and lightness values
}
