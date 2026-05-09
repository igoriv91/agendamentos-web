import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Agendamentos',
        short_name: 'Agenda',
        description: 'Sistema de agendamento online para empresas de serviços',
        theme_color: '#1B3FAE',
        background_color: '#1B3FAE',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        categories: ['business', 'productivity'],
        icons: [
          { src: '/pwa-64x64.png',          sizes: '64x64',   type: 'image/png' },
          { src: '/pwa-192x192.png',         sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png',         sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // API calls — network first, fall back to cache
            urlPattern: ({ url }) => url.pathname.startsWith('/auth') === false &&
              (url.pathname.startsWith('/staff') || url.pathname.startsWith('/services') ||
               url.pathname.startsWith('/appointments') || url.pathname.startsWith('/companies') ||
               url.pathname.startsWith('/notifications') || url.pathname.startsWith('/subscriptions') ||
               url.pathname.startsWith('/clients') || url.pathname.startsWith('/book')),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
            },
          },
          {
            // Google Fonts and other external resources
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
