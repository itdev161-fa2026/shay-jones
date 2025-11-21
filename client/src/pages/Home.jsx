import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { getPosts, deletePost } from '../services/api';
import { AuthContext } from '../context/authContext';
import './Home.css';

// Import toast
import { toast } from 'react-hot-toast'; 

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch posts on component mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Make sure the backend server is running.');
      toast.error('Failed to load posts'); //  Toast for fetch error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete confirmation using toast
  const handleDelete = (postId) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete this post?
          <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
            <button
              style={{ background: "red", color: "white", padding: "4px 8px" }}
              onClick={async () => {
                try {
                  await deletePost(postId);
                  setPosts(posts.filter((p) => p._id !== postId));
                  toast.success("Post deleted successfully!"); //toast successful
                  toast.dismiss(t.id);
                } catch (err) {
                  toast.error("Failed to delete post."); //toast failure
                  console.error(err);
                  toast.dismiss(t.id);
                }
              }}
            >
              Yes
            </button>
            <button
              style={{ padding: "4px 8px" }}
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: 5000 }
    );
  };

  if (loading) {
    return <div className="container loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1>Recent Posts</h1>
        {user ? (
          <button
            onClick={() => navigate('/posts/create')}
            className="create-post-button"
          >
            Create New Post
          </button>
        ) : (
          <p className="auth-message">
            <a href="/login">Login</a> or <a href="/register">register</a> to create posts.
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. Check back later!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              onDelete={() => handleDelete(post._id)} // Pass the post ID
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
