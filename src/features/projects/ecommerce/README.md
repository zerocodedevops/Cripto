# 🛍️ DevOps Shop: E-commerce Experience

> **Status**: 🚀 Production Ready | **Quality**: ✨ Strict Compliance |
> **Tests**: 🛡️ 100% Passing

Un e-commerce completo, rápido y accesible diseñado para demostrar capacidades
avanzadas de frontend y arquitectura React.

## ✨ Características Premium (100% Completado)

### 🏪 Catálogo Interactivo

- **Paginación "Load More"**: UX moderna que carga productos progresivamente sin
  recargas de página.
- **Búsqueda Avanzada**: Entrada por texto y **Búsqueda por Voz** 🎙️ integrada.
- **Filtros en Tiempo Real**: Filtrado cliente-servidor optimizado.

### 💳 Flujo de Compra Realista

- **Carrito Persistente**: Estado global mantenido con Redux Toolkit y
  `localStorage`.
- **Checkout con Stripe**: Integración con Stripe Elements para simulación de
  pagos seguros.
- **Experiencia Post-Compra**:
  - Página de **Éxito** con ID de orden único y celebración de confeti 🎉.
  - Página de **Cancelación** con recuperación de flujo.

### 🎨 UI/UX de Alto Nivel

- **Micro-interacciones**: Botones magnéticos y feedback háptico visual.
- **Transiciones**: Navegación suave entre páginas (View Transitions / Framer
  Motion).
- **Diseño Responsivo**: Adaptado perfectamente a móvil, tablet y desktop.

## 🛠️ Excelencia Técnica

Este proyecto sigue los estándares más estrictos de desarrollo:

- **TypeScript Strict Mode**: Tipado fuerte sin `any` implícitos.
  `ComponentProps` para compatibilidad total con librerías externas.
- **Zero Lint Warnings**: Código limpio validado por ESLint + SonarQube rules.
- **Testing Exhaustivo**:
  - **Unit**: Lógica de negocio (Redux Slices, Hooks).
  - **Integration**: Flujos de componentes clave.
  - **E2E**: Navegación crítica y compras (Playwright).

## 🚀 Stack

| Capa        | Tecnología                      |
| ----------- | ------------------------------- |
| **Core**    | React 18, Vite, TypeScript      |
| **Estado**  | Redux Toolkit, RTK Query        |
| **Estilos** | Tailwind CSS, Framer Motion     |
| **Pagos**   | Stripe JS                       |
| **Calidad** | Vitest, Testing Library, ESLint |

## ⚙️ Instalación y Uso

1. **Variables de Entorno**: Asegúrate de tener `.env` en la raíz:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_... # Tu clave pública de Stripe
   ```

2. **Ejecutar**:
   ```bash
   npm run dev
   ```

3. **Tests**:
   ```bash
   npm run test        # Unit & Integration
   npm run test:e2e    # E2E Scenarios
   ```

## 📂 Arquitectura

El módulo vive en `src/features/projects/ecommerce` siguiendo el patrón
**Feature-First**:

- `/components`: UI específica del dominio.
- `/data`: Mocks y datos estáticos robustos.
- `/pages`: Vistas lazy-loaded (Catalog, Checkout, Success).
- `/store`: Slices de Redux aislados (Cart, Auth).
- `/services`: Definiciones de API (RTK Query).

---

_Desarrollado como parte del Portfolio ZeroCode_
