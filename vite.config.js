import { defineConfig } from 'vite' // <--- REMOVE the "javascript" prefix
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Lägg till detta:
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  // Lägg även till detta för att tvinga refresh:
  server: {
    watch: {
      usePolling: true
    }
  }
})