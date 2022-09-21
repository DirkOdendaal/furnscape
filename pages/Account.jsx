import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Account = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);
  return <>{user ? children : null}</>;
};

export default Account;
