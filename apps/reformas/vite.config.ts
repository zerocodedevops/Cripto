import { reactRouter } from '@react-router/dev/vite';
import { defineConfig, type PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactRouter() as unknown as PluginOption,
    tsconfigPaths() as unknown as PluginOption,
  ],
  base: '/reformas/',
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5174,
    host: '127.0.0.1',
    strictPort: true,
  },
  ssr: {
    noExternal: ['react-hook-form', '@hookform/resolvers'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Keep React/Framer together. Split only truly big independent libs.
            if (id.includes('firebase') || id.includes('supabase')) {
              return 'vendor-firebase';
            }
          }
        },
      },
    },
  },
});
