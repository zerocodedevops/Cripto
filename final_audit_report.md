# Ultra auditoría técnica — Portfolio ZeroCode

Fecha: 2026-03-02

## Alcance

Auditoría integral ejecutada sobre el monorepo principal (`/workspace/Portfolio`) con foco en:

- Calidad estática (`eslint`).
- Tipado (`tsc --noEmit`).
- Estabilidad de tests (`vitest --run`).
- Capacidad de build (`vite build`).

## Comandos ejecutados

1. `npm run lint`
2. `npm run type-check`
3. `npm run test -- --run`
4. `npm run build:portfolio`

---

## Resultado ejecutivo (TL;DR)

Sí: **es necesario modificar el código** antes de considerar el proyecto “release-ready”.

- ❌ Lint falla con 20 errores y 10 warnings.
- ❌ Type-check falla con 3 errores críticos.
- ❌ Build de portfolio falla por import roto.
- ✅ Test suite actual pasa (23/23), pero con warnings de calidad de render en entorno test.

---

## Hallazgos críticos (requieren modificación inmediata)

### 1) Import roto que rompe build y type-check

- Ruta importada inexistente en el router:
  - `@/features/projects/mudanzas-coral/src/App`.
- Esto rompe compilación y chequeo de tipos.

**Ubicación:** `src/app/router.tsx` (lazy import de `MediaApp`).

**Acción recomendada (Modificar):**

- Corregir la ruta al módulo real existente, o
- Eliminar temporalmente la ruta `/proyectos/zero-delay/*` si ese módulo ya no forma parte del despliegue, o
- Reintegrar el proyecto faltante dentro del repo.

### 2) Uso de función antes de declaración (errores TS2448)

Aparece en dos componentes por dependencias de hooks que referencian funciones declaradas después:

- `src/features/projects/crypto/components/PriceAlerts.tsx`
  - `toggleAlert` es usado dentro de `useEffect` antes de su declaración.
- `src/features/projects/salon/src/components/booking/steps/ConfirmationStep.tsx`
  - `confirmBooking` es usado en `useEffect` antes de su declaración.

**Acción recomendada (Modificar):**

- Mover las funciones por encima del `useEffect`, o
- Convertirlas en `function` declarations (hoisting), o
- Envolver en `useCallback` declarado antes del efecto.

### 3) Error lint por optional chaining inseguro

- `src/components/ui/MagneticButton.tsx` usa destructuring de `ref.current?.getBoundingClientRect()` que puede devolver `undefined`.

**Acción recomendada (Modificar):**

- Añadir guard clause:
  - `if (!ref.current) return;`
  - luego hacer destructuring seguro del rect.

---

## Hallazgos importantes (alta prioridad)

### 4) Código generado incluido en lint con falsos positivos/noise

- Errores `no-redeclare` en:
  - `src/dataconnect-generated/index.d.ts`
  - `src/dataconnect-generated/react/index.d.ts`

**Acción recomendada (Modificar configuración):**

- Excluir `src/dataconnect-generated/**` de ESLint, o
- Ajustar reglas para archivos `*.d.ts`/código generado.

### 5) Error `process is not defined` en entorno lint

- `src/features/projects/salon/src/lib/prisma.ts`

**Acción recomendada (Modificar):**

- Usar `import.meta.env` donde aplique a frontend, o
- Marcar este archivo como server-only y ajustar scope de ESLint/tsconfig, o
- Definir entorno Node explícito para ese submódulo.

---

## Hallazgos medios (mejorables)

### 6) Warnings de variables no usadas

Detectados en varios módulos, p.ej.:

- `ReviewList.tsx`
- `productsApi.ts`
- `CategoryStep.tsx`
- `actions.ts`
- `ClientRegister.tsx`
- `mocks/handlers.ts`

**Acción recomendada:**

- Eliminar variables no usadas o prefijar sistemáticamente `_` + configurar regla para ignorarlas.

### 7) Warnings en tests por props de framer-motion en DOM mock

Durante Vitest aparecen warnings como `whileHover`, `whileTap`, `whileInView`, `layoutId`.

**Acción recomendada:**

- Mejorar mocks de `framer-motion` en `tests/setup.tsx` para que no propaguen props no DOM, reduciendo ruido de CI.

---

## Decisión por categoría: añadir / eliminar / modificar

### Modificar (sí, prioritario)

1. Router y rutas lazy rotas.
2. Orden/estabilidad de funciones usadas en hooks.
3. Seguridad de `optional chaining` en `MagneticButton`.
4. Scope de lint para código generado y server-only.

### Añadir (sí, recomendado)

1. Regla/documentación para “generated code policy” (qué carpetas excluye lint/type-check).
2. Checklist CI mínima: `lint + type-check + build:portfolio + test --run` como gate obligatorio.
3. Pruebas de smoke para rutas lazy críticas (evitar imports inexistentes).

### Eliminar (sí, selectivo)

1. Imports/rutas huérfanas de proyectos que ya no estén en el repo.
2. Variables no usadas y código muerto detectado por ESLint.

---

## Plan de remediación sugerido (rápido)

1. **Hotfix de build**: reparar import de `mudanzas-coral` en router.
2. **Hotfix TS**: reordenar `toggleAlert` y `confirmBooking`.
3. **Hotfix lint**: corregir guard clause en `MagneticButton`.
4. **Higiene tooling**: excluir `dataconnect-generated` de lint o ajustar reglas para `.d.ts`.
5. **Limpieza warnings**: eliminar variables no usadas y mejorar mocks de motion en tests.

---

## Veredicto final

El estado actual es **funcional para tests unitarios**, pero **no apto para release** mientras fallen `type-check` y `build`.

**Conclusión:** sí, es necesario **añadir**, **eliminar** y sobre todo **modificar** código/configuración en varios puntos críticos para recuperar estabilidad de CI y despliegue.
