import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // path.resolve ensures this works on ALL environments including Netlify
      '@': path.resolve(__dirname, './src'),
    },
  },
})
