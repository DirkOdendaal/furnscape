import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { AccountLayout, UserDetails } from "../../../../components";

const Details = () => {
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
        <UserDetails user={user} />
      </div>
    </AccountLayout>
  );
};

export default Details;
