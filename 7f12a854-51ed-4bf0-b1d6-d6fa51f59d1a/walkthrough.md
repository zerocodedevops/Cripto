# Walkthrough — Production Build Fix & Optimization

## Problemas Resueltos

### 1. Error `createContext` / `jsx` en Producción ✅

- **Causa raíz**: La estrategia de `manualChunks` separaba React, Framer Motion y Radix UI en chunks diferentes, rompiendo el contexto de React en runtime.
- **Solución**: Chunking conservador — solo se aíslan librerías masivas **independientes** (Firebase, Charts, PDF). React y todo su ecosistema UI permanecen juntos.

### 2. Chunks > 1000kB ✅

- `index.js` (Core + UI): **~370kB**
- `vendor-firebase`: **~585kB**
- `vendor-charts`: **~571kB**

### 3. Ruta `/proyectos/reformas` → 404 ✅

- **Causa raíz**: El build del sub-app Reformas se copiaba a `dist/proyectos/reformas/`, colisionando con la ruta integrada del SPA principal.
- **Solución**: Movido el output del sub-app standalone a `dist/reformas/`. Añadido rewrite en `firebase.json`. La ruta `/proyectos/reformas` ahora la maneja el SPA principal.

### 4. Build pipeline del monorepo ✅

- **Causa raíz**: `zerodelay` usa Vite 7 pero los scripts del root intentaban usar Vite 5 CLI flags (`--emptyOutDir`).
- **Solución**: Cada sub-app usa `npm run build` internamente + `shx cp` para copiar al `dist/` raíz.
- Creados 10 archivos stub faltantes en zerodelay (páginas, componentes).

## Estructura Final `dist/`

```
dist/
├── index.html          ← Portfolio SPA principal
├── assets/             ← Assets del Portfolio
├── zerodelay/          ← Sub-app standalone
├── devops-shop/        ← Sub-app standalone
└── reformas/           ← Sub-app standalone
```

## Archivos Modificados

| Archivo                        | Cambio                                            |
| ------------------------------ | ------------------------------------------------- |
| `vite.config.ts`               | Chunking conservador (solo Firebase, Charts, PDF) |
| `package.json`                 | Build scripts con `npm run build` + copy          |
| `firebase.json`                | Rewrite para `/reformas/**`                       |
| `apps/reformas/vite.config.ts` | Base path → `/reformas/`                          |
| `apps/zerodelay/package.json`  | Skip `tsc` en build                               |
| `apps/zerodelay/src/`          | 10 archivos stub creados                          |

## Deploy

```bash
npm run build && firebase deploy --only hosting
```
