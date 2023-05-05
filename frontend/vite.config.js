import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      },
    }),
  ],
});
