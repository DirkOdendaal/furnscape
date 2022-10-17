import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { signUp } = useAuth();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    if (
      password === confirmPassword &&
      (passwordMatch !== "" || password !== "")
    ) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  const handleSignUp = async (email, password) => {
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
                <input
                  ref={email}
                ></input>
              </li>
              <li>
                <h3>Password</h3>
              </li>
              <li>
                <input
                  type="password"
                  ref={password}
                ></input>
              </li>
              <li>
                <h3>Confirm Password</h3>
              </li>
              <li>
                <input
                  type="password"
                  ref={confirmPassword}
                ></input>
              </li>
              <li>
                <button
                  type="button"
                  className="login-button"
                  onClick={() => {
                    if (passwordMatch) {
                      if (password === "" || passwordMatch === "") {
                        toast.error("Password Cannot Be Empty", {
                          style: {
                            backgroundColor: "#012e55",
                            color: "#2cdd82",
                          },
                          duration: 6000,
                        });
                      } else {
                        handleSignUp(email, password);
                      }
                    } else {
                      toast.error("Passwords Do Not Match", {
                        style: { backgroundColor: "#012e55", color: "#2cdd82" },
                        duration: 6000,
                      });
                    }
                  }}
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
