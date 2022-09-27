import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp.js";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import "./app.css";

function App() {
  const [response, setResponse] = useState({});

  useEffect(() => {
    console.log("Response : ", response);
  }, [JSON.stringify(response)]);

  return (
    <BrowserRouter>
      {console.log("Responses : ", response)}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              response?.status ? (
                <Home response={response} setResponse={setResponse} />
              ) : (
                <Login setResponse={setResponse} />
              )
            }
          />
          <Route
            path="/home"
            element={
              response?.status ? (
                <Navigate to="/" />
              ) : (
                <Login setResponse={setResponse} />
              )
            }
          />
          <Route
            path="/login"
            element={response?.status ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={
              response?.status ? (
                <Navigate to="/home" />
              ) : (
                <SignUp setResponse={setResponse} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
