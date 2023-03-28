import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Signup = () => {
  const toastStyle = { backgroundColor: "#012e55", color: "#2cdd82" };
  const { signUp } = useAuth();
  const email = useRef("");
  const password = useRef("");

  const handleSignUp = async () => {
    if (email.current.value === "") {
      toast.error("Email Cannot Be Empty", {
        style: toastStyle,
        duration: 6000,
      });
      return;
    }

    if (password.current.value === "") {
      toast.error("Password Cannot Be Empty", {
        style: toastStyle,
        duration: 6000,
      });
      return;
    }

    try {
      await signUp(email.current.value, password.current.value);
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
                <input ref={email}></input>
              </li>
              <li>
                <h3>Password</h3>
              </li>
              <li>
                <input type="password" ref={password}></input>
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
                  onClick={handleSignUp}
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
