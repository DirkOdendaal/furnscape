import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handelReset = async (email) => {
    try {
      await resetPassword(email).then(() => {
        console.log("Logged In");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="container">
          <div>
            <h3 className="header">Reset Password</h3>
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
                <button
                  type="button"
                  className="login-button"
                  onClick={() => handelReset(email)}
                >
                  Send Reset Password Email
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
