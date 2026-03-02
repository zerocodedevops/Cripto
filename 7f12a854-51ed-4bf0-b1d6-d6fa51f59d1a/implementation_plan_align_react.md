# Implementation Plan - Align React Versions & Fix Bundling

## Goal

Resolve the production runtime error by aligning React versions across the monorepo and simplifying Vite's chunking strategy to avoid dependency resolution failures.

## Proposed Changes

### [Root] [package.json](file:///c:/Users/dgper/Proyectos/ZeroCode/package.json)

- Ensure React 18.2.0 is correctly used and deduplicated.
- (Optional) Upgrade to 18.3.1 to better handle React 19 features if any.

### [Apps] [reformas/package.json](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/package.json)

- Downgrade to React 18.2.0 to match the root and the integrated feature.

### [Root] [vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/vite.config.ts)

- Simplify `manualChunks`.
- Group `react`, `react-dom`, `react-router-dom`, and `framer-motion` into a single `vendor` chunk.
- Only split truly massive, independent libs like `firebase`.

## Verification Plan

### Automated Tests

- Run `npm run build` and `npx vite preview`.
- Verify the app loads without the `createContext` error.
