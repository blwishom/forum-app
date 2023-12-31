import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const requestObject = {
      title: title,
      content: content,
      user_id: user_id,
    };

    try {
      const response = await fetch('http://localhost:8800/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      });

      if (response.ok) {
        setSuccessMessage('Post created.');
        setErrorMessage('');
        navigate('/');
      } else {
        console.log(response);
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
    navigate('/')
  }

  return (
    <div className='create-post-container centered'>
      <h1 id='create-post' style={{ color: 'orange'}}>Create Post</h1>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      {successMessage && <div className='success-message'>{successMessage}</div>}
      <form onSubmit={handleCreatePost} className='create-post-form'>
        <input
          className='create-post-input'
          type='text'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className='create-post-textarea'
          type='text'
          placeholder='Content'
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="create-post-btn" type='submit'>Create Post</button>
        <button className="create-post-btn" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default CreatePost;
