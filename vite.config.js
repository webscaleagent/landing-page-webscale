// viteReact.config.js 
import react from '@vitejs/plugin-react'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  server: {
    proxy: {
      "/api/submit": {
        target: "https://crmgo.webscale.dz",
        changeOrigin: true,
        secure: true,
        rewrite: () => "/api/v1/public/forms/47401ef7-042c-4994-8645-569b14749758/submit",
      },
    },
  },
})
