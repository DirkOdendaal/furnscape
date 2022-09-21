import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login, googleSignIn } = useAuth();
  const router = useRouter();
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      router.push("/");
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
                <input></input>
              </li>
              <li>
                <h3>Password</h3>
              </li>
              <li>
                <input type="password"></input>
              </li>
              <li>
                <button
                  type="button"
                  className="login-button"
                  onClick={() =>
                    handleLogin("odendaaldirkjnr@gmail.com", "0Dendaal")
                  }
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
