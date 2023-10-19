import React, {useState} from "react";
import {Routes,Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Post from "./components/post/Post";
import CreatePost from "./components/create-post/CreatePost";
import UpdatePost from "./components/update-post/UpdatePost";
import UserPost from "./components/user-post/UserPost";
import AuthContextProvider from "./service/AuthContextProvider";

function App() {
  const [isLoggedIn] = useState(false);

    return (
        <div className="App">
          <AuthContextProvider value={( isLoggedIn )}>
          <Navbar/>
            <Routes>
              <Route path="/" exact element={<Dashboard/>}/>
              <Route path="/post/:post_id" exact element={<Post/>}/>
              <Route path="/login" exact element={<Login/>}/>
              <Route path="/signup" exact element={<Signup/>}/>
              <Route path="/create-post" exact element={<CreatePost/>}/>
              <Route path="/update-post" exact element={<UpdatePost/>}/>
              <Route path="/post" exact element={<UserPost/>}/>
            </Routes>
          </AuthContextProvider>
        </div>
        )
}
export default App;
