import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import PublicLayout from '../layouts/PublicLayout';
import ProductsPage from '../pages/public/ProductsPage';
import LoginPage from '../pages/auth/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';
import ProfilePage from '../pages/ProfilePage';
import AdminPage from '../pages/AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
