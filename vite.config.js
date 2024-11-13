import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
  registerType: 'autoUpdate',
  includeAssets: [
    'favicon-196.ico',
    'apple-icon-180.png',
    'manifest-icon-192.maskable.png',
    'manifest-icon-512.maskable.png',
  ],
  manifest: {
    name: 'Telesecundaria 763',
    short_name: 'Telesecundaria 763',
    description: 'Telesecundaria 763',
    icons: [
      {
        src: 'icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#171717',
    background_color: '#e8ebf2',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
  
  workbox: {
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Límite aumentado a 10 MiB
    cleanupOutdatedCaches: true, // Limpia cachés antiguas automáticamente
    runtimeCaching: [
      {
        urlPattern: 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/datosUsuario.php',
        handler: 'NetworkFirst', // Intenta obtener de la red primero y, si falla, usa el caché
        options: {
          cacheName: 'user-data-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
          },
          cacheableResponse: {
            statuses: [0, 200], // Solo almacena respuestas con códigos 0 y 200
          },
        },
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});