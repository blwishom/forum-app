import React, {useState} from "react";
import {Routes,Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import CreatePost from "./components/create-post/CreatePost";
import AuthContextProvider from "./service/AuthContextProvider";

function App() {
  const [isLoggedIn] = useState(false);

    return (
        <div className="App">
          <AuthContextProvider value={( isLoggedIn )}>
          <Navbar/>
            <Routes>
              <Route path="/" exact element={<Dashboard/>}/>
              <Route path="/login" exact element={<Login/>}/>
              <Route path="/signup" exact element={<Signup/>}/>
              <Route path="/create-post" exact element={<CreatePost/>}/>
            </Routes>
          </AuthContextProvider>
        </div>
        )
}
export default App;
