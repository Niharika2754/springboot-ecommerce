/**
 * Navbar Component - Application navigation header
 */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';
import { ROUTES, APP_NAME } from '../../constants/index.ts';
import Button from '../Button/index.tsx';
import './styles.ts';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand" onClick={handleLogoClick}>
          <span className="navbar__logo">🛒</span>
          <span className="navbar__title">{APP_NAME}</span>
        </div>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <span className="navbar__user">Welcome, {user?.name}</span>
              <Button variant="outline" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="small" onClick={() => navigate(ROUTES.LOGIN)}>
                Login
              </Button>
              <Button variant="primary" size="small" onClick={() => navigate(ROUTES.REGISTER)}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
