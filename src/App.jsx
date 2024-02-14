import React, { Profiler } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import {  useSelector } from 'react-redux'
function App() {
  let { username } = useSelector(state => state.user)
  return (
    <div className="font-Inter w-full h-full">
      <Toaster
        position="top-right"
        containerStyle={{
          top: "60px",
          fontSize: "12px",
        }}
      />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={username ? <Home /> : <Navigate to={'/sign-in'} />} />
          <Route path="/about" element={username ? <About /> : <Navigate to={'/sign-in'} />} />
          <Route path="/sign-in" element={!username ? <SignIn /> : <Navigate to={'/'} />} />
          <Route path="/sign-up" element={!username ? <SignUp /> : <Navigate to={'/'} />} />
          <Route path="/profile" element={username ? <Profile /> : <Navigate to={'/sign-in'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
