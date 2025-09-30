import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permitir acceso desde cualquier IP
    port: 3006
  },
  build: {
    outDir: 'dist'
  }
})