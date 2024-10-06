<<<<<<< HEAD
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
    name: 'Gian TODO list',
    short_name: 'Gian TODOs',
    description: 'Una app para crear los TODOs de Gian',
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
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
