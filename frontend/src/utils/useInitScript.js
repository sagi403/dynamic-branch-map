import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export const useInitScript = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return isLoaded;
};
