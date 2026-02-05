import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageLoader } from "@/components/ui/PageLoader";

// Pages
const Landing = lazy(() => import("@salon/pages/Landing"));

// Admin Components (Lazy Loaded)
const AdminLogin = lazy(() => import("@salon/pages/AdminLogin"));
const AdminLayout = lazy(() => import("@salon/layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("@salon/pages/AdminDashboard"));
const AdminServices = lazy(() => import("@salon/pages/admin/ServicesPage"));
const AdminStylists = lazy(() => import("@salon/pages/admin/StylistsPage"));
const RequireAuth = lazy(() => import("@salon/components/auth/RequireAuth"));

// Client Components (Lazy Loaded)
const ClientLayout = lazy(() => import("@salon/layouts/ClientLayout"));
const ClientLogin = lazy(() => import("@salon/pages/auth/ClientLogin"));
const ClientRegister = lazy(() => import("@salon/pages/auth/ClientRegister"));
const MyBookings = lazy(() => import("@salon/pages/client/MyBookings"));

export default function SalonRoutes() {
	return (
		<Suspense
			fallback={
				<div className="p-20 text-white flex justify-center">
					<PageLoader text="Loading Salon..." />
				</div>
			}
		>
			<div className="theme-salon min-h-screen bg-background text-foreground font-sans">
				<Routes>
					{/* Public Landing */}
					<Route path="/" element={<Landing />} />

					{/* Authentication */}
					<Route path="/auth/admin/login" element={<AdminLogin />} />
					<Route path="/auth/client/login" element={<ClientLogin />} />
					<Route path="/auth/client/register" element={<ClientRegister />} />

					{/* Client Portal */}
					<Route path="/client" element={<ClientLayout />}>
						<Route path="bookings" element={<MyBookings />} />
						<Route index element={<Navigate to="bookings" replace />} />
					</Route>

					{/* Protected Admin Routes */}
					<Route path="/admin" element={<RequireAuth />}>
						<Route element={<AdminLayout />}>
							<Route
								index
								element={
									<Navigate to="/proyectos/salon/admin/dashboard" replace />
								}
							/>
							<Route path="dashboard" element={<AdminDashboard />} />
							<Route path="services" element={<AdminServices />} />
							<Route path="team" element={<AdminStylists />} />
						</Route>
					</Route>

					{/* Redirect helper old admin login */}
					<Route
						path="/admin/login"
						element={<Navigate to="/auth/admin/login" replace />}
					/>

					{/* Redirect unknown salon paths to landing */}
					<Route path="*" element={<Navigate to="" replace />} />
				</Routes>
			</div>
		</Suspense>
	);
}
