import React from "react";
import CustomerAccountNav from "./CustomerAccountNav";

const AccountLayout = ({ children }) => {
  return (
    <div className="account-details-container">
      <CustomerAccountNav />
      {children}
    </div>
  );
};

export default AccountLayout;
