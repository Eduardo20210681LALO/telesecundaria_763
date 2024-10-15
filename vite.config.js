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
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Aumenta el límite a 5 MiB
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});