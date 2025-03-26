import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    
  ],
  base:'/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'import.meta.env': {
      VITE_OPENWEATHER_API_KEY: JSON.stringify(process.env.VITE_OPENWEATHER_API_KEY),
      VITE_TIANDITU_API_KEY: JSON.stringify(process.env.VITE_TIANDITU_API_KEY)
    }
  }
})
