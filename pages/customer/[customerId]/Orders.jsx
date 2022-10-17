import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AccountLayout } from "../../../components";
import { useAuth } from "../../../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);
  return (
    <AccountLayout>
      <div>
        <h3>Orders</h3>
      </div>
    </AccountLayout>
  );
};

export default Orders;
