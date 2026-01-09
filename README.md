# 🚀 ZeroCode Crypto Dashboard

> **La Experiencia Definitiva de Seguimiento de Criptomonedas en Tiempo Real**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)

**ZeroCode Crypto** es un dashboard de criptomonedas de vanguardia y alto
rendimiento, construido para la web moderna. Aprovecha la potencia de
**WebSockets** para datos en tiempo real, capacidades **PWA** para una
experiencia nativa, y una interfaz **Glassmorphism** impresionante que establece
un nuevo estándar.

---

## ✨ Características Principales

### 🔥 Motor de Datos en Tiempo Real

- **Feed WebSocket en Vivo**: Conexión directa a streams de Binance para
  actualizaciones de precio inferiores a un segundo.
- **Fallback Inteligente**: Degradación elegante a la API REST de CoinGecko si
  los WebSockets no están disponibles.
- **Rendimiento Optimizado**: Caché inteligente y actualizaciones por lotes para
  minimizar re-renderizados.

### 📊 Analíticas Profesionales

- **Gráficos Interactivos**: Potenciados por `Recharts` con tooltips
  personalizados y comportamiento responsive.
- **Mapa de Calor del Mercado**: Visualiza la dominancia del mercado y las
  tendencias de un vistazo.
- **Comparadores Avanzados**: Comparación de activos lado a lado con métricas
  críticas (Rango, Cap, Vol, suministro).

### 💼 Gestión de Portafolio

- **Seguimiento de Transacciones**: Registra Compras/Ventas con cálculo
  automático de base de costo.
- **Resumen de Tenencias**: Evaluación en tiempo real del valor total de tu
  portafolio.
- **Persistencia Local**: Almacenamiento seguro en el navegador (sin necesidad
  de servidor).

### 🌍 Global y Accesible

- **Internacionalización (i18n)**: Soporte nativo para 6 monedas/idiomas (EN,
  ES, FR, DE, IT, PT).
- **Accesibilidad Primero**: HTML semántico, etiquetas ARIA y soporte de
  navegación por teclado.
- **Certificado PWA**: Instalable en móvil/escritorio, código capaz de funcionar
  offline.

---

## 🛠️ Stack Tecnológico

- **Core**: React 18, TypeScript, Vite
- **Estilos**: Tailwind CSS, Framer Motion (Animaciones)
- **Estado/Lógica**: Context API, Custom Hooks
- **Visualización de Datos**: Recharts
- **Iconos**: Lucide React
- **Utils**: date-fns, i18next
- **Build**: Target ESNext, soporte Top-level await

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/zerocodedevops/Cripto.git

# 2. Navegar al directorio
cd Cripto

# 3. Instalar dependencias
npm install

# 4. Iniciar Servidor de Desarrollo
npm run dev
```

### Build de Producción

```bash
# Crear build optimizado para producción
npm run build

# Previsualizar localmente
npm run preview
```

---

## 📱 Progressive Web App (PWA)

Este proyecto está totalmente configurado como una PWA.

- **Instalable**: Añadir a la Pantalla de Inicio en iOS/Android.
- **Soporte Offline**: Service Workers almacenan en caché activos críticos.
- **Manifest**: Soporte completo de metadatos (Iconos, Pantallas de carga,
  Colores de tema).

---

## 🛡️ Calidad de Código ("Tolerancia Cero")

Este repositorio mantiene estándares de calidad estrictos:

- **Linting**: Configuración estricta de ESLint (0 advertencias toleradas).
- **Seguridad de Tipos**: Cumplimiento total de TypeScript (chequeos `noEmit`).
- **Arquitectura**: Estructura de carpetas modular por "Features" para
  escalabilidad.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor lee el
[CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de
conducta y el proceso para enviar pull requests.

1. Haz un Fork
2. Crea tu rama (`git checkout -b feature/funcionalidad-increible`)
3. Haz Commit de tus cambios (`git commit -m 'Añadir funcionalidad increíble'`)
4. Haz Push a la rama (`git push origin feature/funcionalidad-increible`)
5. Abre un Pull Request

---

**Creado con ❤️ por [ZeroCode DevOps](https://github.com/zerocodedevops)**
