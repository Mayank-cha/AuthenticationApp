import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function SignUp({ setResponse }) {
  const navigate = useNavigate();
  const [signUpEmail, setSignUpEmail] = useState("");
  const [SignUpPassword, setSignUpPassword] = useState("");
  const [name, setUserName] = useState("");
  const [res, setResp] = useState({});

  const simpleSignUp = async () => {
    // console.log("Simple sign up");
    const api = "http://localhost:3737/signup";
    const body = {
      email: signUpEmail,
      password: SignUpPassword,
      name,
      // bio: "",
      // phone: "",
      // image: "",
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
        setResponse({ ...(error?.data || "") });
        navigate("/");
      });
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label for="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-up-htm">
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input"
                value={name}
                onChange={(event) => {
                  event.preventDefault();

                  setUserName(event.target.value);
                }}
              />
            </div>

            <div className="group">
              <label for="pass" className="label">
                Email Address
              </label>
              <input
                id="pass"
                type="text"
                className="input"
                value={signUpEmail}
                onChange={(event) => {
                  event.preventDefault();
                  setSignUpEmail(event.target.value);
                }}
              />
            </div>

            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                value={SignUpPassword}
                onChange={(event) => {
                  event.preventDefault();
                  setSignUpPassword(event.target.value);
                }}
              />
            </div>

            <div className="group">
              <input
                type="submit"
                className="button"
                value="Sign Up"
                onClick={() => simpleSignUp()}
              />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <label for="tab-1">
                <Link to="/login">Already Member?</Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
