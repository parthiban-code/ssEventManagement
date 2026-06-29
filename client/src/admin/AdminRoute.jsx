import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/admin';

export default function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
