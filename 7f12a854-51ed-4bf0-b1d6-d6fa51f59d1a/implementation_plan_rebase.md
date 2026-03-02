# Restructuring Reforms Route to /proyectos/reformas/

The user wants the Reforms project to be accessible at `/proyectos/reformas/` instead of `/reformas/`, matching the URL pattern of other portfolio projects and resolving 404 errors in the local dev environment.

## Proposed Changes

### [MODIFY] [vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/vite.config.ts)

- Update `base` to `/proyectos/reformas/`.

### [MODIFY] [react-router.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/react-router.config.ts)

- Ensure prerendering routes are consistent (they are already relative, so they should work, but I'll double check the `/proyectos` and `/contacto` routes which might conflict with the portfolio paths if not careful).
- Actually, the prerender routes should probably be just the sub-paths.

### [MODIFY] [package.json](file:///c:/Users/dgper/Proyectos/ZeroCode/package.json) (Root)

- Update `build:reformas` to output to `../../dist/proyectos/reformas`.
- Update the `mkdir -p` command to create the full path.

### [MODIFY] [firebase.json](file:///c:/Users/dgper/Proyectos/ZeroCode/firebase.json) (Root)

- Update the rewrite for `/reformas/**` to `/proyectos/reformas/**`.
- Destination: `/proyectos/reformas/index.html`.

### [MODIFY] [Projects.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/components/sections/Projects.tsx)

- Update `demoUrl` to `/proyectos/reformas/`.

### [MODIFY] [vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/vite.config.ts) (Root)

- Add a proxy in the `server` section to redirect `/proyectos/reformas/` to `http://localhost:5174/proyectos/reformas/`.
- This ensures that while running `npm run dev` in the root, the reforms app is still accessible.
- **Note:** The user will need to run `npm run dev` in the `apps/reformas` folder as well, or I can provide a root script to run both.

## Verification Plan

1. Run `npm run build` in root and verify `dist/proyectos/reformas` content.
2. Run `npm run dev` in `apps/reformas`.
3. Run `npm run dev` in the root.
4. Access `http://localhost:5173/proyectos/reformas/` and verify it loads.
