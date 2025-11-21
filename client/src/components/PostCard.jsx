import { Link, useNavigate } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (e) => {
    e.preventDefault(); // prevent link navigation
    navigate(`/posts/${post._id}/edit`);
  };

  return (
    <div className="post-card">
      <Link to={`/posts/${post._id}`} className="post-card-link">
        <h2>{post.title}</h2>
        <div className="post-meta">
          <span className="post-author">By {post.user?.name || 'Unknown'}</span>
          <span className="post-date">{formatDate(post.createDate)}</span>
        </div>
        <p className="post-preview">
          {post.body.substring(0, 150)}
          {post.body.length > 150 ? '...' : ''}
        </p>
        <span className="read-more">Read more →</span>
      </Link>

      {/* ⭐ Edit and Delete buttons */}
      <div className="post-card-buttons">
        {onDelete && (
          <button
            className="delete-post-button"
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
          >
            Delete
          </button>
        )}
        <button className="edit-post-button" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default PostCard;
