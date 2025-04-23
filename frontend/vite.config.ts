import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // Here
    strictPort: true,
    port: 3000,
  },
});
