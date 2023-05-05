import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
          },
        },
      }),
    ],
  };
});
