import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute  from './components/ProtectRoute';
import Header from './components/Header';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import './App.css';

//Added import 
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/*Added Toaster Component*/}
           <Toaster 
            position="top-right"
            reverseOrder={false}
                toastOptions={{
              duration: 4000, // default duration
              success: {
                duration: 3000, // success toasts auto-dismiss faster
              },
              error: {
                duration: 5000, // error toasts stay longer
              },
            }}
          />
          
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/posts/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;