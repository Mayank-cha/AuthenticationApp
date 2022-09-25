import React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import "./app.css";

function App() {
  const user = false;
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
