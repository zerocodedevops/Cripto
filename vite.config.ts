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
            if (
              id.includes('jspdf') ||
              id.includes('html2canvas') ||
              id.includes('canvas-confetti')
            )
              return 'utils';

            // Everything else stays in vendor (React, Framer, Router, i18n, etc.)
            // This guarantees the app boots correctly.
            return 'vendor';
          }
        },
      },
    },
  },
});
