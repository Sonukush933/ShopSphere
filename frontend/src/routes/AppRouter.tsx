import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import PublicLayout from '../layouts/PublicLayout';
import ProductsPage from '../pages/public/ProductsPage';
import LoginPage from '../pages/auth/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';
import ProfilePage from '../pages/ProfilePage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/public/NotFoundPage';
import OrdersPage from '../pages/OrdersPage';

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
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
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
      {
        path: '*',
        element: <NotFoundPage />,
      },
      
    ],
  },
]);

export default router;
