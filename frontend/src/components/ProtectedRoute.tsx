import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('customer' | 'admin')[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
