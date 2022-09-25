import React from "react";
import Google from "../../images/google.png";
import Facebook from "../../images/facebook.png";
import "./login.css";

function Login() {
  const google = () => {
    window.open("http://localhost:3737/auth/google", "_self");
  };

  return (
    <div className="login-wrap">
      {/* <div className="nav-bar">
        <div>Internship</div>
        <div>Login</div>
      </div> */}
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label for="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label for="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input id="user" type="text" className="input" />
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
              />
            </div>
            <div className="group">
              <input id="check" type="checkbox" className="check" checked />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign In" />
              <div className="logo-container" onClick={() => google()}>
                <img className="google-logo" src={Google} />
                Sign in With Google
              </div>
            </div>
          </div>
          <div className="sign-up-htm">
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input id="user" type="text" className="input" />
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
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Repeat Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Email Address
              </label>
              <input id="pass" type="text" className="input" />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign Up" />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <label for="tab-1">Already Member?</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
