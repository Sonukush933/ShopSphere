import { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../features/auth/authSlice';
import { useLogoutMutation } from '../../../services/authApi';
import { api } from '../../../services/api';

type AuthButtonProps = {
  mobile?: boolean;
};

function AuthButton({ mobile = false }: AuthButtonProps) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => {
          if (!isAuthenticated) {
            navigate('/login');
            return;
          }

          setOpen((prev) => !prev);
        }}
        className={`
      flex
      items-center
      gap-3
      rounded-lg
      bg-primary
      text-white
      transition-all
      hover:bg-primary-hover
      ${mobile ? 'h-[46px] px-3' : 'h-[50px] px-4'}
`}
      >
        <div className="text-right leading-tight">
          {isAuthenticated && user ? (
            <>
              <p className={mobile ? 'text-[12px]' : 'text-[12px]'}>Hi,</p>

              <p
                className={
                  mobile ? 'text-[12px] font-medium' : 'text-[16px] font-medium'
                }
              >
                {user.name.split(" ")[0]}
              </p>
            </>
          ) : (
            <>
              <p className={mobile ? 'text-[12px]' : 'text-[14px]'}>
                Sign Up Now
              </p>

              {/* <p
                className={
                  mobile ? 'text-[11px] font-medium' : 'text-[14px] font-medium'
                }
              >
                Get Upto Rs.1500 off
              </p> */}
            </>
          )}
        </div>

       <UserRound size={mobile ? 18 : 22} />

        {isAuthenticated && <ChevronDown size={mobile ? 18 : 22} />}
      </button>

      {open && isAuthenticated && (
        <div
          className="
        absolute
        right-0
        top-[52px]
        z-50
        w-52
        rounded-lg
        border
        border-border
        bg-white
        p-2
        shadow-md
        "
        >
          <button
            onClick={() => {
              navigate('/profile');
              setOpen(false);
            }}
            className="
          w-full
          rounded-md
          px-3
          py-2
          text-left
          hover:bg-surface
          "
          >
            My Profile
          </button>

          <button
            onClick={() => {
              navigate('/orders');
              setOpen(false);
            }}
            className="
          w-full
          rounded-md
          px-3
          py-2
          text-left
          hover:bg-surface
          "
          >
            My Orders
          </button>

          <button
            onClick={async () => {
              await handleLogout();
              setOpen(false);
            }}
            className="
          w-full
          rounded-md
          px-3
          py-2
          text-left
          text-danger
          hover:bg-surface
          "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthButton;
