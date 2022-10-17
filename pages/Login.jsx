import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Login = () => {
  const { login, googleSignIn } = useAuth();
  const email = useRef();
  const password = useRef();

  const handleLogin = async (email, password) => {
    try {
      await login(email.current.value, password.current.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="container">
          <div>
            <h3 className="header">Login</h3>
          </div>
          <div className="login-input">
            <ul className="login-list">
              <li>
                <h3>Email</h3>
              </li>
              <li>
                <input ref={email} type="email"></input>
              </li>
              <li>
                <h3>Password</h3>
              </li>
              <li>
                <input type="password" ref={password}></input>
              </li>
              <li>
                <button
                  type="button"
                  className="login-button"
                  onClick={() => handleLogin(email, password)}
                >
                  Login
                </button>
              </li>
            </ul>
            <div className="providers-div">
              <ul className="login-providers">
                <li>
                  <button
                    type="button"
                    className="google-sign-in-button"
                    onClick={() => googleSignIn()}
                  >
                    Sign In with Google
                  </button>
                </li>
                <li className="password-reset">
                  <Link href="/ResetPassword">
                    <span>Forgot Password?</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
