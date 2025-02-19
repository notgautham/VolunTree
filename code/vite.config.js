import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    include: ["src/**/*.js", "src/**/*.jsx"],
    loader: "jsx",
  },
  server: {
    proxy: {
      // Forward any request starting with /api to the backend at port 5000
      "/api": "http://localhost:5000",
    },
  },
});
