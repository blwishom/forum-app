import React from "react"; 
import "./Signup.css";
import { useState } from "react"; 
import { Link } from "react-router-dom";


function Signup() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleSignup = async () => {
    
        const requestObject = 
        {
            "username": username, 
            "password": password 
        }
    
        if(!username || !password){
            setSuccessMessage(""); 
            setErrorMessage("Sign up failed. Please check username or password.");
            return; 
        }
        try {
            const response = await fetch("http://localhost:8080/user", {
                method: "POST", 
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(requestObject),
            }); 
            if(response.ok) {
                setSuccessMessage("Sign up was a success. You can now log in.")
                setErrorMessage("");
            } else {
                setSuccessMessage(""); 
                setErrorMessage("Unable to process request. Please check your information")
            }
    
        } catch(error){
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
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder='First Name' 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder='Last Name' 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="text"  
          placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <input 
          type="text"  
          placeholder='Confirmed Password' 
          onChange={(e) => setPassword(e.target.value)} 
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
