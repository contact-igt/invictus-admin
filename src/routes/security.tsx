import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'redux/selectors/auth/authSelector';
import paths from './paths';
import sitemap from './sitemap';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to={`${paths.signin}`} state={{ from: location }} replace />;
  }

  // Find the current route in the sitemap to determine requirements
  const currentItem = sitemap.find(item =>
    item.path === location.pathname ||
    item.items?.some(subItem => subItem.path === location.pathname)
  );

  const requiredKey = currentItem?.clientKey;
  const routeId = currentItem?.id;

  // 1. Super-admin & Admin Bypass (Admins can view User Management but not manage)
  if (user?.role === 'super-admin' || user?.role === 'admin') {
    return children;
  }

  // 2. Client Access
  if (user?.role === 'client') {
    // Block User Management entirely
    if (routeId === 'user-management') {
      return <Navigate to="/" replace />;
    }

    // Restricted to dashboard or matching project key
    if (!requiredKey) {
      return routeId === 'dashboard' ? children : <Navigate to="/" replace />;
    }

    if (requiredKey !== user.client_key) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;