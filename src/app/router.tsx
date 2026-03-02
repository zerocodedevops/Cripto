import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageLoader } from "@/components/ui/PageLoader";
import { PageTransition } from "@/components/ui/PageTransition";
import { CurrencyProvider } from "@/features/projects/crypto/context/CurrencyContext";

// Lazy Load Components
const Home = lazy(() => import("@/features/home/Home"));
const PymesService = lazy(() => import("@/features/services/PymesService"));
const FreelanceMadrid = lazy(() => import("@/features/about/FreelanceMadrid"));
const Pricing = lazy(() => import("@/features/pricing/Pricing"));
const EcommerceApp = lazy(() => import("@/features/projects/ecommerce/routes"));
const AnalyticsApp = lazy(() => import("@/features/projects/analytics/routes"));
const SalonApp = lazy(() => import("@salon/routes"));
const CryptoApp = lazy(() =>
	import("@/features/projects/crypto/pages/CryptoDashboard").then((m) => ({
		default: m.CryptoDashboard,
	})),
);
const MediaApp = lazy(
	() => import("@/features/projects/mudanzas-coral/src/App"),
);
const ReformsApp = lazy(() => import("@/features/projects/reformas/routes"));
const NotFound = lazy(() => import("@/features/misc/NotFound"));

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Cargando ZeroCode..." />}>
						<Home />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/desarrollo-web-pymes-madrid",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Preparando soluciones..." />}>
						<PymesService />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/disenador-web-freelance-madrid",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Conociendo a David G..." />}>
						<FreelanceMadrid />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/precios-paginas-web",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Calculando valor..." />}>
						<Pricing />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/proyectos/ecommerce/*",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Loading Store..." />}>
						<EcommerceApp />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/proyectos/analytics/*",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Loading Analytics..." />}>
						<AnalyticsApp />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/proyectos/crypto",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Connecting to Exchange..." />}>
						<CurrencyProvider>
							<CryptoApp />
						</CurrencyProvider>
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/proyectos/salon/*",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Loading Salon App..." />}>
						<SalonApp />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/proyectos/zero-delay/*",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Cargando Zero Delay..." />}>
						<MediaApp />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "/proyectos/reformas/*",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader text="Abriendo Cero Caos..." />}>
						<ReformsApp />
					</Suspense>
				</PageTransition>
			),
		},
		{
			path: "*",
			element: (
				<PageTransition>
					<Suspense fallback={<PageLoader />}>
						<NotFound />
					</Suspense>
				</PageTransition>
			),
		},
	],
	{
		future: {
			v7_startTransition: true,
		},
	},
);

export function Router() {
	return <RouterProvider router={router} />;
}
