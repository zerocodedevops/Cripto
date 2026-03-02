import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
      '@salon': fileURLToPath(
        new URL('./src/features/projects/salon/src', import.meta.url),
      ),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'i18next',
      'react-i18next',
      '@supabase/supabase-js',
      'firebase/app',
      'firebase/auth',
    ],
  },
  server: {
    warmup: {
      clientFiles: [
        './src/features/home/Home.tsx',
        './src/components/sections/Hero.tsx',
        './src/components/sections/About.tsx',
        './src/components/layout/Navbar.tsx',
      ],
    },
    watch: {
      ignored: [
        '**/dist/**',
        '**/build/**',
        '**/playwright-report/**',
        '**/test-results/**',
        '**/node_modules/**',
      ],
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // ONLY split massive independent libraries that are safe to isolate.
            // DO NOT split react, framer-motion, lucide-react or radix-ui
            // from the main bundle to avoid context/jsx runtime errors.

            if (id.includes('firebase') || id.includes('supabase')) {
              return 'vendor-firebase';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            if (
              id.includes('jspdf') ||
              id.includes('html2canvas') ||
              id.includes('@react-pdf')
            ) {
              return 'vendor-pdf';
            }
          }
        },
      },
    },
  },
});
