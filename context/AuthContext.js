import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { toast } from "react-hot-toast";

const Context = createContext();
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => useContext(Context);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleUserProfile(user, setUser);
      } else {
        setUser(null);
      }

      setLoading(false);

      return () => unsubscribe();
    });
  }, []);

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success("Logged in!", {
          style: { backgroundColor: "#012e55", color: "#2cdd82" },
        });
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Signed Up", {
          style: { backgroundColor: "#012e55", color: "#2cdd82" },
        });
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        switch (errorMessage) {
          case "Firebase: Error (auth/invalid-email).":
            toast.error("Invalid Email", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            toast.error("Email Already Registered", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          default:
            toast.error(`${errorMessage}`, {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
        }
      });
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("Logged in!", {
          style: { backgroundColor: "#012e55", color: "#2cdd82" },
        });
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        switch (errorMessage) {
          case "Firebase: Error (auth/invalid-email).":
            toast.error("Invalid Email", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          case "Firebase: Error (auth/wrong-password).":
            toast.error("Incorrect Password", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          case "Firebase: Error (auth/user-not-found).":
            toast.error("No Such User", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          default:
            toast.error(`${errorMessage}`, {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
        }
      });
  };

  const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Reset Email Sent.", {
          style: { backgroundColor: "#012e55", color: "#2cdd82" },
          duration: 6000,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        switch (errorMessage) {
          case "Firebase: Error (auth/missing-email).":
            toast.error("Missing Email Address.", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          case "Firebase: Error (auth/invalid-email).":
            toast.error("Invalid Email Address", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          case "Firebase: Error (auth/user-not-found).":
            toast.error("No Such User", {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
          default:
            toast.error(`${errorMessage}`, {
              style: { backgroundColor: "#012e55", color: "#2cdd82" },
              duration: 6000,
            });
            break;
        }
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    toast.success("Logged Out", {
      style: { backgroundColor: "#012e55", color: "#2cdd82" },
      duration: 6000,
    });
    router.push("/");
  };

  return (
    <Context.Provider
      value={{ user, login, googleSignIn, signUp, logout, resetPassword }}
    >
      {loading ? null : children}
    </Context.Provider>
  );
};

export const handleUserProfile = async (userAuth, setUser) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = doc(db, `users`, uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot._document) {
    const { displayName, email, phoneNumber, emailVerified } = userAuth;
    const timeStamp = new Date();
    const role = "customer";

    try {
      await setDoc(userRef, {
        displayName,
        email,
        phoneNumber,
        emailVerified,
        role,
        createdAt: timeStamp,
      });
      setUser({
        uid: uid,
        email: email,
        displayName: displayName,
        phoneNumber: phoneNumber,
        emaillVerified: emailVerified,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();
    console.log(user);
    setUser({
      uid: uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      emaillVerified: user.emailVerified,
      role: user.role,
    });
  }
  return userRef;
};
