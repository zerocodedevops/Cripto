import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    //   manifest: {
    //     name: 'ZeroCode Portfolio',
    //     short_name: 'ZeroCode',
    //     description: 'Crypto Analytics & Developer Portfolio',
    //     theme_color: '#0ea5e9',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@salon': fileURLToPath(new URL('./src/features/projects/salon/src', import.meta.url)),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Large independent libs to split
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('recharts')) return 'charts';
            if (id.includes('@react-pdf')) return 'pdf';
            if (id.includes('framer-motion')) return 'animation';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('canvas-confetti')) return 'utils';

            // Everything else stays in vendor (React, Framer, Router, i18n, etc.)
            // This guarantees the app boots correctly.
            return 'vendor';
          }
        },
      },
    },
  },
});
