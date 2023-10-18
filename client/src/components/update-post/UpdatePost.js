import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './UpdatePost.css';

const UpdatePost = () => {
  const location = useLocation();
  const post = location.state.post;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const requestObject = {
      title: title,
      content: content,
      user_id: user_id,
    };

    try {
      const response = await fetch(`http://localhost:8800/api/post/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      });

      if (response.ok) {
        setSuccessMessage('Post created.');
        setErrorMessage('');
        navigate(`/post/${post._id}`);
      } else {
        setSuccessMessage('');
        setErrorMessage('Post creation failed. Please check your information.');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again later.');
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/post/${post._id}`)
  }

  return (
    <div className='update-post-container centered'>
      <h1 style={{ color: 'orange'}}>Update Post</h1>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      {successMessage && <div className='success-message'>{successMessage}</div>}
      <form onSubmit={handleUpdatePost} className='update-post-form'>
        <input
          className='update-post-input'
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className='update-post-textarea'
          type='text'
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="update-post-btn" type='submit'>Update Post</button>
        <button className="update-post-btn" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default UpdatePost;
