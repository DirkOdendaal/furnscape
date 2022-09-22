import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Login = () => {
  const { user, login, googleSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
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
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <h3>Password</h3>
              </li>
              <li>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
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
