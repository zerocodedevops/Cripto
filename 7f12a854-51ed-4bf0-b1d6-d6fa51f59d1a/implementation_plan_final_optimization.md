# Implementation Plan - Final Chunk Optimization

## Goal

Resolve Vite build warnings about large chunks (>1000 kB) and stabilize the dev server by refining `manualChunks` and updating server ignore rules.

## Proposed Changes

### [Root] [vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/vite.config.ts)

- Implement a more granular `manualChunks` strategy:
  - `vendor-framework`: react, react-dom, react-router, scheduler
  - `vendor-ui`: framer-motion, lucide-react, @radix-ui
  - `vendor-utils`: date-fns, dayjs, zod, i18next, fuse.js
  - `vendor-firebase`: firebase, @supabase
  - `vendor-charts`: recharts, d3
- Add `**/build/**` to `server.watch.ignored` to prevent dev server reloads triggered by sub-app builds.

### [Apps] [reformas/vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/vite.config.ts) & [apps/zerodelay/vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/zerodelay/vite.config.ts)

- Apply matching granular chunking to resolve warnings in sub-app builds.

## Verification Plan

### Automated Tests

- Run `npm run build` from root and verify that no chunks exceed 1000 kB (or that the warning is significantly reduced).
- Verify successful build and no runtime errors in `npx vite preview`.
