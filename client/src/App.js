import React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import "./app.css";

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route
            path="/home"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
