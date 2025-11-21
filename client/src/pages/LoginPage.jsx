import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Login from '../components/Login';
import './AuthPages.css';

//Added import 
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const { login, user, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.success("Logged in successfully!"); // ⭐ Toast on auto-login (if already logged in)
      navigate(['/']);
    }
  }, [user, navigate]);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);

    if (result.success) {
      toast.success("Logged in successfully!"); // Success Toast 
      navigate('/');
    } else {
      toast.error(result.message || "Login failed."); // Error Toast 
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <Login onLogin={handleLogin} error={error} />
        <div className="auth-switch">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
