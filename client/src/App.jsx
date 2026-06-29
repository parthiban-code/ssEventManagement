import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import AdminLayout from './admin/AdminLayout';
import AdminRoute from './admin/AdminRoute';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminBookings from './admin/AdminBookings';
import AdminCalendar from './admin/AdminCalendar';
import AdminClients from './admin/AdminClients';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="calendar" element={<AdminCalendar />} />
        <Route path="clients" element={<AdminClients />} />
      </Route>
    </Routes>
  );
}
