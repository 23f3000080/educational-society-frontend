import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Educational Society',
        short_name: 'Edu Society',
        theme_color: '#0f0c3b',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'ES_ICON.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'ES_ICON.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})