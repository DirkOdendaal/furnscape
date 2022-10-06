import React from "react";
import CustomerAccountNav from "./CustomerAccountNav";

const AccountLayout = ({ children }) => {
  return (
    <div className="account-details-container">
      <CustomerAccountNav />
      <div>{children}</div>
    </div>
  );
};

export default AccountLayout;
