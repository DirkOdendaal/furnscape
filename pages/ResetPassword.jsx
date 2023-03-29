import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const email = useRef();
  const { resetPassword } = useAuth();

  const handelReset = async (email) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.push("/");
      }
    }, [router, user]);
    try {
      await resetPassword(email.current.value).then(() => {
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
                <input ref={email}></input>
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
