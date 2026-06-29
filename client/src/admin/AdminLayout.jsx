import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../api/admin';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>SS Admin Panel</h2>
        <ul className="admin-nav">
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/bookings">Bookings</NavLink></li>
          <li><NavLink to="/admin/calendar">Calendar</NavLink></li>
          <li><NavLink to="/admin/clients">Clients</NavLink></li>
        </ul>
        <div style={{ marginTop: '2rem' }}>
          <NavLink to="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            ← Back to Website
          </NavLink>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ marginTop: '1rem', width: '100%', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
