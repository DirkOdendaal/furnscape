import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-hot-toast";

const Context = createContext();
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => useContext(Context);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
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
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log({ credential, token, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    toast.success("Logged in!");
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    toast.success("Logged Out");
  };
  return (
    <Context.Provider value={{ user, login, googleSignIn, signUp, logout }}>
      {loading ? null : children}
    </Context.Provider>
  );
};
