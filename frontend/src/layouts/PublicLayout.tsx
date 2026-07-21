import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../features/auth/authSlice';

function PublicLayout() {
  const dispatch = useAppDispatch();
 const { user, isAuthenticated } = useAppSelector(
  (state) => state.auth
);

  function handleAuth() {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(
        login({
          user: {
            _id: '1',
            name: 'Rahul',
            email: 'rahul@example.com',
            role: 'user',
          },
          accessToken: 'demo-access-token',
        }),
      );
    }
  }

  return (
    <main className="min-h-screen">
      {/* Navbar */}

      <header className="flex items-center justify-between border-b p-4">
        <nav className="flex gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {user && <span>Hi, {user.name}</span>}

          <button onClick={handleAuth}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>

      {/* Current Page */}
      <section className="p-10">
        <Outlet />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-5 text-center text-white">
        ShopSphere Footer
      </footer>
    </main>
  );
}

export default PublicLayout;
