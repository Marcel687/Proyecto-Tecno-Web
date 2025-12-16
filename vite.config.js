import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // <-- 1. IMPORTA ESTO

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // 2. AGREGA ESTA SECCIÓN COMPLETA
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})


