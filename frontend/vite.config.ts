import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

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
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: true,
    port: 5001,
  },
  define: {
    __APP_API_URL__: "http://localhost:5000",
  },
})
