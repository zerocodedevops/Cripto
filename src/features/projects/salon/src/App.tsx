import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';

// Auth Components
import RequireAuth from './components/auth/RequireAuth';

// Pages
import Landing from './pages/Landing';

// Client Pages
import ClientLogin from './pages/auth/ClientLogin';
import ClientRegister from './pages/auth/ClientRegister';
import MyBookings from './pages/client/MyBookings';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ServicesPage from './pages/admin/ServicesPage';
import StylistsPage from './pages/admin/StylistsPage';
// import Bookings from './pages/admin/Bookings'; // Removed until component exists

function App() {
    return (
        <Router>
            <Routes>
                {/* Landing: Defines the main entry point for the salon project */}
                <Route path="/proyectos/salon" element={<Landing />} />

                {/* Root Redirect: If user lands on localhost:5173/ redirect to project */}
                <Route path="/" element={<Navigate to="/proyectos/salon" replace />} />

                {/* Client Auth */}
                <Route path="/proyectos/salon/auth/client/login" element={<ClientLogin />} />
                <Route path="/proyectos/salon/auth/client/register" element={<ClientRegister />} />

                {/* Client Portal */}
                <Route path="/proyectos/salon/client" element={<ClientLayout />}>
                    <Route path="bookings" element={<MyBookings />} />
                    <Route index element={<Navigate to="/proyectos/salon/client/bookings" replace />} />
                </Route>

                {/* Admin Auth */}
                <Route path="/proyectos/salon/auth/admin/login" element={<AdminLogin />} />

                {/* Admin Routes (Protected) */}
                <Route path="/proyectos/salon/admin" element={<RequireAuth />}>
                    <Route element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="services" element={<ServicesPage />} />
                        <Route path="team" element={<StylistsPage />} />
                        {/* <Route path="bookings" element={<Bookings />} /> */}
                        <Route index element={<Navigate to="/proyectos/salon/admin/dashboard" replace />} />
                    </Route>
                </Route>

                {/* Helper Redirects for easy access */}
                <Route path="/admin" element={<Navigate to="/proyectos/salon/admin" replace />} />
                <Route path="/login" element={<Navigate to="/proyectos/salon/auth/client/login" replace />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/proyectos/salon" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
