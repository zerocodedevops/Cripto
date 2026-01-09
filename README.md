# 🚀 ZeroCode Crypto Dashboard

> **The Ultimate Real-Time Cryptocurrency Tracking Experience**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)

**ZeroCode Crypto** is a bleeding-edge, high-performance cryptocurrency
dashboard built for the modern web. Leveraging the power of **WebSockets** for
real-time data, **PWA** capabilities for native-like experience, and a stunning
**Glassmorphism** UI, it sets a new standard for personal finance trackers.

---

## ✨ Key Features

### 🔥 Real-Time Data Engine

- **Live WebSocket Feed**: Direct connection to Binance streams for sub-second
  price updates.
- **Smart Fallback**: Seamless degradation to CoinGecko REST API if WebSockets
  are unavailable.
- **Optimized Performance**: Intelligent caching and batched updates to minimize
  re-renders.

### 📊 Professional Analytics

- **Interactive Charts**: Powered by `Recharts` with custom tooltips and
  responsive behavior.
- **Market Heatmap**: Visualize market dominance and trends at a glance.
- **Advanced Comparators**: Side-by-side asset comparison with critical metrics
  (Rank, Cap, Vol, supply).

### 💼 Portfolio Management

- **Transaction Tracking**: Log Buys/Sells with automatic cost-basis
  calculation.
- **Holdings Summary**: Real-time evaluation of your total portfolio value.
- **Local Persistence**: Secure, browser-based data storage (no server
  required).

### 🌍 Global & Accessible

- **Internationalization (i18n)**: Native support for 6 currencies/languages
  (EN, ES, FR, DE, IT, PT).
- **Accessibility First**: Semantic HTML, ARIA labels, and keyboard navigation
  support.
- **PWA Certified**: Installable on mobile/desktop, offline-capable code.

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **State/Logic**: Context API, Custom Hooks
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Utils**: date-fns, i18next
- **Build**: ESNext target, Top-level await support

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/zerocodedevops/Cripto.git

# 2. Navigate to directory
cd Cripto

# 3. Install dependencies
npm install

# 4. Start Development Server
npm run dev
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview locally
npm run preview
```

---

## 📱 Progressive Web App (PWA)

This project is fully configured as a PWA.

- **Installable**: Add to Home Screen on iOS/Android.
- **Offline Support**: Service Workers cache critical assets.
- **Manifest**: Full metadata support (Icons, Splash screens, Theme colors).

---

## 🛡️ Code Quality ("Zero Tolerance")

This repository maintains strict quality standards:

- **Linting**: ESLint strict configuration (0 warnings tolerated).
- **Type Safety**: Full TypeScript compliance (`noEmit` checks).
- **Architecture**: Modular "Features" folder structure for scalability.

---

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md)
for details on our code of conduct, and the process for submitting pull
requests.

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ by [ZeroCode DevOps](https://github.com/zerocodedevops)**
