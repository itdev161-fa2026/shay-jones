import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { createPost } from '../services/api';
import PostForm from '../components/PostForm';
import './CreatePost.css';

// ⭐ Import toast
import { toast } from 'react-hot-toast'; 

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    if (!user) {
    return <div>Please log in to create a post.</div>;
  }

  const handleSubmit = async (title, body) => {
    try {
      setError(null);
      setLoading(true);

      const newPost = await createPost(title, body);

      toast.success("Post created successfully!"); //Success Toast 

      // Navigate to the new post
      navigate(`/posts/${newPost._id}`);
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.msg ||
        'Failed to create post. Please try again.';
      setError(errorMsg);
      setLoading(false);

      // Error toast 
      toast.error(errorMsg);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-post-page">
      <div className="container">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <PostForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreatePost;