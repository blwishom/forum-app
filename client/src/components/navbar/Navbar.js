import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('user_id')
    navigate('/login')
  }
  return (
    <div className='navbar'>
      <Link className="logo" to="/">INFORUM</Link>
      {username ? (
        <ul className="nav-menu">
          <li className='nav-btn'><Link to="/">Home</Link></li>
          <li className='nav-btn'><Link to="/post">Posts</Link></li>
          <li className='nav-btn' onClick={handleLogout}>Logout</li>
        </ul>
      ) : (
        <ul className="nav-menu">
          <li className='nav-btn'><Link to="/login">Login</Link></li>
          <li className='nav-btn'><Link to="/signup">Register</Link></li>
        </ul>
      )
      }
    </div>


  )
}

export default Navbar;
