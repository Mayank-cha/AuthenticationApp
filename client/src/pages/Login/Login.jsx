import React, { useState, useEffect } from "react";
import Google from "../../images/google.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setResponse }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const google = () => {
    window.open("http://localhost:3737/auth/google", "_self");
  };

  const simpleSignIn = async () => {
    const api = "http://localhost:3737/signin";
    const body = {
      email: email,
      password: password,
    };
    console.log(body);
    await axios
      .post(api, body)
      .then((res) => {
        console.log(res);
        setResponse({ ...(res?.data || "") });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label for="tab-1" className="tab">
          Sign In
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input"
                value={email}
                onChange={(event) => {
                  event.preventDefault();
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="group">
              <label for="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                data-type="password"
                value={password}
                onChange={(event) => {
                  event.preventDefault();
                  setPassword(event.target.value);
                }}
              />
            </div>
            {/* <div className="group">
              <input id="check" type="checkbox" className="check" checked />
            </div> */}

            <div className="group">
              <input
                type="submit"
                className="button"
                value="Sign In"
                onClick={() => simpleSignIn()}
              />
              <div className="logo-container" onClick={() => google()}>
                <img className="google-logo" src={Google} />
                Sign in With Google
              </div>
            </div>
          </div>
          <div className="hr"></div>
          <div className="foot-lnk">
            <label htmlFor="tab-1">
              <Link to="/signup">Not having an account ? Create Account</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
