# Implementation Plan - Vite Build Optimization

## Goal

Resolve Vite/Rollup warnings about large chunks (>500 kB) by implementing manual chunk splitting and fine-tuning build configurations across all project modules.

## Proposed Changes

### [Root] [vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/vite.config.ts)

- Implement `build.rollupOptions.output.manualChunks` to separate:
  - `vendor-react`: react, react-dom, react-router-dom
  - `vendor-firebase`: firebase, supabase
  - `vendor-ui`: framer-motion, lucide-react, radix-ui
  - `vendor-utils`: date-fns, dayjs, zod, i18next
- Increase `chunkSizeWarningLimit` to 1000 kB.

### [Sub-App] [reformas/vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/vite.config.ts)

- Add `build.rollupOptions.output.manualChunks` and `chunkSizeWarningLimit` matching the root strategy.

### [Sub-App] [zerodelay/vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/zerodelay/vite.config.ts)

- Add `build.rollupOptions.output.manualChunks` and `chunkSizeWarningLimit` matching the root strategy.

## Verification Plan

### Automated Tests

- Run `npm run build` from the root and verify that chunk size warnings are resolved or minimized.
- Inspect the `dist` folder to ensure chunks are distributed effectively.
