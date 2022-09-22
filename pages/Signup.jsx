import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { user, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
                <h3>Confirm Password</h3>
              </li>
              <li>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
