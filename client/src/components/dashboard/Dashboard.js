import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css";

function Dashboard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  const getData = async (e) => {
    try {
      const response = await fetch("http://localhost:8800/api/post", {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
      } 
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  const toPost = (e, post_id) => {
    e.preventDefault();
    navigate(`/post/${post_id}`)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <Link to={'/create-post'}>Create Post</Link>
      </div>
      {!posts && <div className='post-header'>No posts found.</div>}
      {posts && posts.map((post) => (
        <div onClick={(e) => toPost(e, post._id)} className="post-container">
          <div className="post-header">
            <div className="post-author">Posted by {post.author.username}</div>
            <div className="post-title">{post.title}</div>
          </div>
          <div className="post-content">{post.content}</div>
        </div>
      ))  
      }
    </div>
  )
}

export default Dashboard
