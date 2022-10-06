import React from "react";
import { FaShoppingCart, FaUser, FaQuestionCircle } from "react-icons/fa";

const CustomerAccountNav = () => {
  return (
    <div className="account-details-card account-card">
      <div className="account-details-card-header">
        <h2>My Account</h2>
      </div>
      <div className="list">
        <div className="account-details-card-header">
          <h3>Orders</h3>
        </div>
        <ul>
          <li>Orders</li>
          <li>Invoices</li>
          <li>Reviews</li>
        </ul>
      </div>
      <div className="list">
        <div className="account-details-card-header">
          <h3>Customer Information</h3>
        </div>
        <ul>
          <li>Personal Details</li>
          <li>Address Book</li>
        </ul>
      </div>
      <div className="list">
        <div className="account-details-card-header">
          <h3>Help</h3>
        </div>
        <ul>
          <li>Help</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerAccountNav;
