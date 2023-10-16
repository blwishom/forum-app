import React from "react";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); 
    if (password !== confirmedPassword) {
      setSuccessMessage("");
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }
    const requestObject =
    {
      "userName": username,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    }

    try {
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });
      if (response.ok) {
        alert("Sign up was a success. You can now log in.")
        setErrorMessage("");
        navigate("/login")
      } else {
        setSuccessMessage("");
        setErrorMessage("Unable to process request. Please check your information")
      }

    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("An error has occured. Please try again later.")
    }
  }

  return (
    <div className='signup-container centered'>
      <h1>Sign Up</h1>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Confirmed Password'
          onChange={(e) => setConfirmedPassword(e.target.value)}
          required
        />
        <button className='signup-btn'>Sign Up</button>
      </form>
      <Link to="/login">
        <div className='member'>Already a member? Login Here</div>
      </Link>
    </div>
  )
}

export default Signup;
