# Zero Chaos — Framework SEO Local para Reformas

Framework escalable para generar webs SEO-optimizadas de empresas de reformas. Primer cliente: **Zero Chaos Madrid**.

## User Review Required

> [!IMPORTANT]
> **Decisión técnica: React Router v7 Framework Mode con SSG nativo**
> React Router v7 ofrece pre-rendering estático nativo: se define una función `prerender()` en la config y genera HTML estático por ruta en build time. Esto elimina la necesidad de dependencias externas como `react-snap` o `vite-ssg`, y garantiza que cada landing de barrio/servicio sea HTML puro indexable.

> [!WARNING]
> **React Router v7 Framework Mode vs Library Mode**
> El monorepo actual usa React Router como _library_ (`react-router-dom`). El Framework Mode requiere `@react-router/dev` como plugin de Vite. Esta app (`apps/reformas`) será un proyecto independiente con su propio `package.json`, así que no afecta a las demás apps. Pero el patrón de routing cambia: en lugar de `<Routes>/<Route>`, se usa routing por archivos en `app/routes/`.

> [!CAUTION]
> **Contenido SEO completo (700-1000 palabras)**: Generar contenido de esta extensión para ~12 páginas supone un volumen masivo. Lo haré con calidad (no keyword stuffing), pero el resultado final deberá revisarse manualmente para los datos reales de cada cliente.

---

## Proposed Changes

### 1. Scaffold del proyecto

#### [NEW] [package.json](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/package.json)

React Router v7 Framework Mode + Vite + Tailwind v4 + TypeScript. Dependencias:

- `react`, `react-dom` v19
- `react-router` v7 (framework mode)
- `@react-router/dev`, `@react-router/node`, `@react-router/serve`
- `tailwindcss` v4, `@tailwindcss/postcss`
- `react-helmet-async` (meta dinámico)
- `zod` + `react-hook-form` (formulario presupuesto)

#### [NEW] [react-router.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/react-router.config.ts)

Config con `prerender()` que genera todas las rutas estáticas a partir de la configuración del cliente:

```ts
async prerender() {
  const barrios = clientConfig.barrios.map(b => `/reformas-madrid/${b.slug}`);
  return [
    "/",
    "/reformas-integrales-madrid",
    "/reformas-cocinas-madrid",
    "/reformas-banos-madrid",
    "/proyectos",
    "/blog",
    "/contacto",
    "/sobre-nosotros",
    ...barrios,
  ];
}
```

#### [NEW] [vite.config.ts](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/vite.config.ts)

Vite config con el plugin `@react-router/dev` y `base: "/reformas/"`.

---

### 2. Arquitectura Core / Client (data separation)

#### [NEW] `src/core/` — Componentes y lógica reutilizable

| Archivo                                  | Contenido                                                           |
| ---------------------------------------- | ------------------------------------------------------------------- |
| `core/seo/MetaTags.tsx`                  | Componente react-helmet-async dinámico                              |
| `core/seo/SchemaLocalBusiness.tsx`       | JSON-LD LocalBusiness                                               |
| `core/seo/SchemaFAQ.tsx`                 | JSON-LD FAQ                                                         |
| `core/tracking/analytics.ts`             | Hooks para GA4 (pageview, eventos)                                  |
| `core/tracking/events.ts`                | Eventos: CTA click, form submit, WhatsApp click                     |
| `core/components/WhatsAppButton.tsx`     | Botón flotante WhatsApp                                             |
| `core/components/CTAButton.tsx`          | Botón CTA reutilizable                                              |
| `core/components/ContactForm.tsx`        | Formulario corto: nombre + tel + tipo reforma                       |
| `core/components/BeforeAfterGallery.tsx` | Galería antes/después (no slider, imágenes estáticas)               |
| `core/components/ProcessSteps.tsx`       | 5 pasos: Visita → Presupuesto → Planificación → Ejecución → Entrega |
| `core/components/PricingTable.tsx`       | Tabla precios orientativos                                          |
| `core/components/FAQSection.tsx`         | Accordion FAQ                                                       |
| `core/components/SocialProof.tsx`        | Stats: proyectos, años, reseñas                                     |
| `core/components/Guarantees.tsx`         | Garantías visibles                                                  |
| `core/components/TestimonialCard.tsx`    | Tarjeta reseña                                                      |
| `core/layout/Header.tsx`                 | Navbar con logo + navegación + CTA                                  |
| `core/layout/Footer.tsx`                 | Footer con datos empresa, links, legal                              |
| `core/layout/RootLayout.tsx`             | Layout raíz con Header + Footer + WhatsApp                          |

#### [NEW] `src/clients/madrid-zerochaos/` — Datos del primer cliente

| Archivo          | Contenido                                                        |
| ---------------- | ---------------------------------------------------------------- |
| `config.ts`      | Nombre, teléfono, WhatsApp, email, dirección, colores, logo      |
| `barrios.ts`     | Array con slug, nombre, contenido SEO, proyectos cercanos        |
| `servicios.ts`   | integrales, cocinas, baños — cada uno con contenido SEO completo |
| `precios.ts`     | Rangos de precios por tipo de reforma                            |
| `proyectos.ts`   | Portfolio antes/después con descripciones                        |
| `testimonios.ts` | Reseñas de clientes                                              |
| `blog.ts`        | Artículos del blog (V1 estático, preparado para CMS)             |

---

### 3. Templates (páginas)

#### [NEW] `src/templates/`

| Template               | Ruta                       | Secciones                                                                                        |
| ---------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| `HomeTemplate.tsx`     | `/`                        | Hero → SocialProof → Servicios → BeforeAfter → Proceso → Precios → Testimonios → Garantías → CTA |
| `ServiceTemplate.tsx`  | `/reformas-*-madrid`       | Hero servicio → Contenido SEO → Precios → Proceso → FAQ → Proyectos → CTA                        |
| `BarrioTemplate.tsx`   | `/reformas-madrid/:barrio` | Hero barrio → Servicios zona → Proyecto cercano → Precios → CTA local                            |
| `ProjectsTemplate.tsx` | `/proyectos`               | Galería filtrable antes/después                                                                  |
| `BlogTemplate.tsx`     | `/blog`                    | Grid de artículos                                                                                |
| `BlogPostTemplate.tsx` | `/blog/:slug`              | Artículo completo con sidebar CTA                                                                |
| `ContactTemplate.tsx`  | `/contacto`                | Formulario + mapa + datos contacto                                                               |
| `AboutTemplate.tsx`    | `/sobre-nosotros`          | Historia + equipo + valores + CTA                                                                |

---

### 4. Routing (React Router v7 file-based)

#### [NEW] `app/routes/`

```
app/routes/
├── _index.tsx              → Home
├── reformas-integrales-madrid.tsx
├── reformas-cocinas-madrid.tsx
├── reformas-banos-madrid.tsx
├── reformas-madrid.$barrio.tsx  → Landing por barrio (dinámico)
├── proyectos.tsx
├── blog._index.tsx
├── blog.$slug.tsx
├── contacto.tsx
├── sobre-nosotros.tsx
```

Cada route file importa su template + carga datos del cliente.

---

### 5. Sistema de diseño

#### [NEW] [app.css](file:///c:/Users/dgper/Proyectos/ZeroCode/apps/reformas/app/app.css)

**Paleta** (como acordado):

- Primario oscuro: `#1C1C1E` (hero, secciones autoridad)
- Acento ámbar: `#D4A853`
- Fondo claro: `#F5F5F0` (60-70% del contenido)
- Fondo blanco puro: `#FFFFFF`
- Texto oscuro: `#2D2D2D`
- Texto gris: `#6B7280`

**Tipografía**: Inter (Google Fonts), preloaded.

**Espaciado**: Scale 4/8/16/24/32/48/64/96.

**Regla**: Dark solo para Hero, secciones de autoridad y separadores. Resto en claro.

---

### 6. SEO técnico

- Meta dinámico por ruta (title, description, OpenGraph, canonical)
- Schema JSON-LD: `LocalBusiness`, `FAQ`, `Review`
- URLs limpias con arquitectura SILO
- HTML prerenderizado por ruta
- Sitemap estático generado en build
- `robots.txt` optimizado
- `<link rel="preload">` para Inter font

---

### 7. Tracking (preparado, sin IDs reales)

- Hook `useAnalytics()` con función `trackEvent()`
- Eventos preparados: `cta_click`, `form_submit`, `whatsapp_click`, `phone_click`, `scroll_50`
- Placeholder para GA4 Measurement ID
- Placeholder para Hotjar Site ID

---

### 8. Barrios V1

| Barrio             | Slug          | Justificación SEO                         |
| ------------------ | ------------- | ----------------------------------------- |
| Salamanca          | `salamanca`   | Alto poder adquisitivo, alta demanda      |
| Chamberí           | `chamberi`    | Vivienda consolidada, reformas frecuentes |
| Chamartín          | `chamartin`   | Zona residencial premium                  |
| Retiro             | `retiro`      | Pisos antiguo a reformar                  |
| Pozuelo de Alarcón | `pozuelo`     | Periferia premium, menos competencia SEO  |
| Majadahonda        | `majadahonda` | Alto ticket, baja competencia digital     |

---

## Fases de implementación

### Fase 1 — Scaffold y arquitectura (actual)

1. Inicializar proyecto con React Router v7 Framework Mode
2. Crear estructura `core/` + `clients/` + `templates/`
3. Implementar sistema de diseño base (CSS + layout)
4. Crear `config.ts` del cliente Zero Chaos Madrid

### Fase 2 — Componentes core

5. Componentes UI: CTAButton, WhatsAppButton, ContactForm, PricingTable, FAQSection, ProcessSteps, SocialProof, Guarantees, TestimonialCard, BeforeAfterGallery
6. Layout: Header, Footer, RootLayout
7. SEO: MetaTags, SchemaLocalBusiness, SchemaFAQ

### Fase 3 — Templates + contenido

8. HomeTemplate con todas las secciones
9. ServiceTemplate (×3 servicios)
10. BarrioTemplate (×6 barrios)
11. Contenido SEO real (700-1000 palabras por landing)
12. Datos de precios, testimonios, proyectos

### Fase 4 — Páginas secundarias

13. ProjectsTemplate, AboutTemplate, ContactTemplate
14. BlogTemplate + BlogPostTemplate (V1 con datos estáticos)

### Fase 5 — SSG + SEO + Performance

15. Configurar `prerender()` para todas las rutas
16. Sitemap + robots.txt
17. Lazy loading, code splitting, font preload
18. Tracking hooks

---

## Verification Plan

### Automated Tests

**Build y prerenderizado**:

```bash
cd apps/reformas && npm run build
```

Verificar que genera HTML estático para cada ruta definida en `prerender()`.

**Dev server**:

```bash
cd apps/reformas && npm run dev
```

Verificar que carga correctamente en localhost.

**Type check**:

```bash
cd apps/reformas && npx tsc --noEmit
```

**Lint**:

```bash
cd apps/reformas && npm run lint
```

### Browser verification

- Navegar cada ruta principal y verificar que carga correctamente
- Verificar que el formulario de contacto valida correctamente
- Verificar que el botón WhatsApp abre el enlace correcto
- Verificar responsive en viewport móvil (375px)
- Verificar alternancia dark/light entre secciones

### Manual Verification

- Inspeccionar HTML prerenderizado para verificar que contiene contenido SEO
- Inspeccionar `<head>` para meta tags dinámicos y Schema JSON-LD
- Verificar contraste AA con las combinaciones de color
