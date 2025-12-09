import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { ThemeContext } from '../context/ThemeContext'; // theme context
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          <h1>The Safe Space Blog</h1> 
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>

          {user ? (
            <>
              <span className="user-welcome">Hello, {user.name || 'User'}</span>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
