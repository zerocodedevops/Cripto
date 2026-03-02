# Plan de Arreglo Definitivo — Rutas de Producción (Reformas & Sub-apps)

## Objetivo

Eliminar el error 404 en `/proyectos/reformas` y asegurar que tanto la versión integrada como la standalone (`/reformas/`) funcionen correctamente, igualando la configuración de Mudanzas (Zero Delay).

## Problemas Identificados

1. **Fallo en Rewrite**: Firebase Hosting puede estar fallando al servir `/index.html` para la ruta profunda `/proyectos/reformas` debido a una configuración de rewrites poco explícita.
2. **Conflicto de Base Path**: La sub-app standalone en `/reformas/` da error de rutas porque espera estar en `/proyectos/reformas/` (heredado de la configuración del framework).
3. **Inconsistencia de Slashes**: La falta de trailing slashes en las reglas de Firebase puede causar 404s en ciertos navegadores o entornos.

## Cambios Propuestos

### 1. Firebase Hosting (`firebase.json`)

Haremos los rewrites más explícitos y robustos, asegurando que cubran tanto con como sin slash, y priorizando el SPA principal.

### 2. Configuración de Sub-apps

Alinearemos los `basename` y `base` de Vite para que coincidan con su ubicación real en producción.

### 3. Verificación de Código Integrado

Comprobaremos que la ruta integrada en el Portfolio no tenga dependencias rotas que solo fallen en producción.

## Pasos de Implementación

### [MODIFY] [firebase.json](file:///c:/Users/dgper/Proyectos/ZeroCode/firebase.json)

- Actualizar rewrites para usar un formato más flexible (`/reformas**` o reglas duales).
- Asegurar que `**` a `/index.html` sea la regla final de "atrapa-todo".

### [MODIFY] [vite.config.ts (Apps)](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/vite.config.ts)

- Confirmar que `base` es `/reformas/`.
- Asegurar que el router de la sub-app standalone no tenga un `basename` prefijado con `/proyectos/`.

### [EXECUTE] Build & Clean Deploy

- Limpiar `dist/`.
- Ejecutar build secuencial.
- Verificar existencia de `dist/reformas/index.html`.
- Desplegar.

## Plan de Verificación

- **Prueba 1**: Visitar `https://zerocode-devops.web.app/proyectos/reformas` (Integrated).
- **Prueba 2**: Visitar `https://zerocode-devops.web.app/reformas/` (Standalone).
- **Prueba 3**: Hacer refresh en ambas y comprobar que no hay 404.
