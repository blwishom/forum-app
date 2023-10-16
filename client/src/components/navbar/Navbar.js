import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className='navbar'>
          <Link className="logo" to="/">INFORUM</Link>
          <ul className="nav-menu">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Register</Link></li>   
          </ul>
    </div>


  )
}

export default Navbar;
