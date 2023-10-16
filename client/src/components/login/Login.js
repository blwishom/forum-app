import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../service/AuthContextProvider";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login, updateUser } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    const requestObject = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data);
        login(data);
        navigate("/dashboard");
      } else {
        setSuccessMessage("");
        setErrorMessage("Login failed. Please check your information.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='login-container centered'>
      <h1>Login</h1>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <form onSubmit={handleLogin} className="signup-form">
        <input 
          type="text" 
          placeholder='Username' 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="text"  
          placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button className='login-btn'>Login</button>
      </form>
      <Link to="/signup">
        <div className='member'>Not a member? Register Now</div>
      </Link>
    </div>
  )
}

export default Login; 
