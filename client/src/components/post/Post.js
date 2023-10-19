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
  const navigate = useNavigate();

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

      if (response.ok) {
        // Fetch the updated comments for the post
        const commentsResponse = await fetch(`http://localhost:8800/api/post/${post_id}/comment`);
        const { comments } = await commentsResponse.json();
        // Update your UI with the new comments
        updateUIWithComments(comments);
        navigate(`/post/${post_id}}`);
      } else {
        setErrorMessage('Comment creation failed. Please check your information.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  }

  // Function to update UI with comments
const updateUIWithComments = (comments) => {
  // Assuming 'commentsContainer' is the container where comments are displayed
  const commentsContainer = document.getElementById('commentsContainer');

  // Clear existing comments
  commentsContainer.innerHTML = '';

  // Render the updated comments
  comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.innerHTML = `<p>${comment.content}</p>`;
    commentsContainer.appendChild(commentElement);
  });
};

  useEffect(() => {
    getPost();
  }, [])

  return (
    <div>
      <div className='post'>
        <h1>Post</h1>
      </div>
      {post && comments &&
      <div className="post-container2">
          <div className="post-header">
            <div className="post-author">Posted by {post.author.username}</div>
            <div className="post-title">{post.title}</div>
          </div>
          <div className="post-content">{post.content}</div>
          {post.author.username === username &&
            <Link className='edit-link' to={'/update-post'} state={{post: post}} style={{ color: 'orange' }}>Edit</Link>
          }
        <h4>Comments:</h4>
        {comments && comments.map((comment) => (
          <div className="comment-container">
            <div className="comment-header">
              <div className="comment-author">Posted by {comment.author[0].username}</div>
            </div>
            <div className="comment-content">{comment.content}</div>
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
          <button className="comment-button">Submit</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Post
