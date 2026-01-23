import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Pages
import Dashboard from './pages/admin/Dashboard';
import Bookings from './pages/admin/Bookings';
import Login from './pages/auth/Login';
import Landing from './pages/Landing';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/auth/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    {/* Redirect /admin to /admin/dashboard */}
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
