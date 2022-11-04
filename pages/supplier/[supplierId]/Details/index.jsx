import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { AccountLayout } from "../../../../components";

const Details = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);

  return (
    <AccountLayout>
      <div>
        <h3>Company Details</h3>
      </div>
    </AccountLayout>
  );
};

export default Details;
