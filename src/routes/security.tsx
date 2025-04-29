import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'redux/selectors/auth/authSelector';
import paths from './paths';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={`${paths.signin}`} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;