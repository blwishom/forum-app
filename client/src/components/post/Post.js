import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Post.css"

function Post() {
  const user_id = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState();
  const { post_id } = useParams();
  const [comments, setComments] = useState();
  const [content, setContent] = useState("");

  const getPost = async (e) => {
    try {
      const response = await fetch(`http://localhost:8800/api/post/${post_id}`, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setPost(data.data.post);
        setComments(data.data.post.comments);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const requestObject = {
      content: content,
      user_id: user_id
    };

    try {
      const response = await fetch(`http://localhost:8800/api/post/${post_id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      });

      if (!response.ok) {
        setErrorMessage('Comment creation failed. Please check your information.');
        alert(errorMessage);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      alert(errorMessage);
    }
  }

  useEffect(() => {
    getPost();
  }, [comments])

  return (
    <div>
      <div className='post'>
        {post && (
          <h1>{post.author.username}'s Post</h1>
        )}
      </div>
      {post && comments && (
        <div className="post-container2">
          <div className="post-header">
            <div className="post-author">Posted by {post.author.username}</div>
            <div className="post-title">{post.title}</div>
          </div>
          <div className="post-content">{post.content}</div>
          {post.author.username === username && (
            <Link
              className='edit-link'
              to={'/update-post'}
              state={{ post: post }}
              style={{ color: 'orange' }}
            >
              Edit
            </Link>
          )}
          <h4>Comments:</h4>
          {comments && comments.map((comment) => (
            <div className="comment-container">
              <div className="comment-header">
                <div className="comment-content">{comment.content}</div>
                <div className="comment-author">
                  Posted by {comment.author[0]?.username} {}
                </div>
              </div>
            </div>
          ))}
          <form onSubmit={handleCreateComment}>
            <textarea
              className="comment-textarea"
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div>
              <button className="comment-button">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post
