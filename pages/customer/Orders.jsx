import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);
  return <div>Orders</div>;
};

export default Orders;
