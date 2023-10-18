import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState();
  const { post_id } = useParams();
  const [comments, setComments] = useState();

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

  useEffect(() => {
    getPost();
  }, [])

  return (
    <div>
      <div className='post'>
        <h1>Post</h1>
      </div>
      {post && comments &&
      <div className="post-container">
          <div className="post-header">
            <div className="post-author">Posted by {post.author.username}</div>
            <div className="post-title">{post.title}</div>
          </div>
          <div className="post-content">{post.content}</div>
        <h4>Comments</h4>
        {comments && comments.map((comment) => (
          <div className="comment-container">
            <div className="comment-header">
              <div className="comment-author">Posted by {comment.author[0].username}</div>
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default Post
