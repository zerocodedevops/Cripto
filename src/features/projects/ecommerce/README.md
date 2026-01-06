# Proyecto 1: E-commerce Moderno

Este es un sub-proyecto integrado dentro del portfolio ZeroCode. Demuestra la
capacidad de construir una tienda online completa con gestión de estado global,
persistencia y pasarela de pago.

## ⚙️ Stack Tecnológico

- **Core**: React 18, TypeScript, Vite.
- **Estado**: Redux Toolkit (Slice Pattern) + RTK Query (Data Fetching).
- **Estilos**: Tailwind CSS + Framer Motion (Animaciones).
- **Pagos**: Stripe Elements (Modo Test).
- **Router**: React Router v7 (Nested Routes).

## 🚀 Funcionalidades Clave

1. **Estado Global Persistente**: Carrito de compras que sobrevive a recargas
   (`localStorage`).
2. **API Mocking**: Uso de `fakestoreapi.com` via RTK Query con caché y
   revalidación.
3. **Filtrado en Cliente**: Búsqueda por texto y categoría en tiempo real.
4. **Optimización**:
   - `Lazy Loading` de rutas.
   - Skeletons para estados de carga.
   - Memoización de componentes pesados.
5. **Clean Code**: Arquitectura modular (`features/projects/ecommerce`).

## 🛠️ Configuración Local

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (si no existe) y añade:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_placeholder
```

> Nota: La clave pública incluida es de prueba estándar de Stripe.

## 📦 Scripts Recomendados

Para analizar el bundle de este sub-proyecto específicamente:

```bash
npx vite-bundle-visualizer
```
