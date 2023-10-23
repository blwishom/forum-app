import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./UserPost.css";

function UserPost() {
  const [errorMessage, setErrorMessage] = useState("");
  const username = localStorage.getItem("username");
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  const getData = async (e) => {
    try {
      const response = await fetch("http://localhost:8800/api/post", {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        const user_posts = data.data.filter(post => post.author.username === username);
        setPosts(user_posts);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  const toPost = (e, post_id) => {
    e.preventDefault();
    navigate(`/post/${post_id}`)
  }

  const deletePost = async (e, post_id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8800/api/post/${post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: post_id }),
      });

      if (response.ok) {
        const data = await response.json();
        const user_posts = data.data.filter(post => post.author.username === username);
        setPosts(user_posts);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    getData();
  }, [posts])

  return (
    <div>
      <div className='user-post'>
        <h1>My Posts</h1>
        <Link id='createPost' to={'/create-post'}>Create Post</Link>
      </div>
      {!posts && <div className='post-header'>No posts found.</div>}
      {posts && posts.map((post) => (
        <>
          <div onClick={(e) => toPost(e, post._id)} className="post-container">
            <div className="post-header">
              <div className="post-title">{post.title}</div>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-author">Posted by {post.author.username}</div>
              <button onClick={(e) => deletePost(e, post._id)}>Delete Post</button>
          </div>
        </>
      ))
      }
    </div>
  )
}

export default UserPost
