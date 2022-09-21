import React from "react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { user, signUp } = useAuth();

  const handleSignUp = async (email, password) => {
    try {
      await signUp(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="container">
          <div>
            <h3 className="header">Signup</h3>
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
                <h3>Confirm Password</h3>
              </li>
              <li>
                <input type="password"></input>
              </li>
              <li>
                <button
                  type="button"
                  className="login-button"
                  onClick={() =>
                    handleSignUp("odendaaldirkjnr@gmail.com", "0Dendaal")
                  }
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
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
    </>
  );
};

export default Signup;
