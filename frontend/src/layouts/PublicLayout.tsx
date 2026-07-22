import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { useLogoutMutation } from '../services/authApi';
import { api } from '../services/api';

function PublicLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
 
  const [logoutUser] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logoutUser().unwrap();

      dispatch(logout());

      dispatch(api.util.resetApiState());

      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between border-b p-4">
        <nav className="flex gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user && <span>Hi, {user.name}</span>}

          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </header>

      <section className="p-10">
        <Outlet />
      </section>

      <footer className="bg-gray-900 p-5 text-center text-white">
        ShopSphere Footer
      </footer>
    </main>
  );
}

export default PublicLayout;
