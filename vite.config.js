import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base relative path ensures assets resolve correctly on GitHub Pages and custom domains
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
