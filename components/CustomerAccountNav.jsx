import Link from "next/link";
import React from "react";
import { FaShoppingCart, FaUser, FaQuestionCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const CustomerAccountNav = () => {
  const { user } = useAuth();

  return (
    <div className="nav-account-details">
      <div className="nav-account-details-header">
        <h2>My Account</h2>
      </div>
      <div className="list">
        <div className="nav-section-header">
          <FaShoppingCart />
          <h3>Orders</h3>
        </div>
        <ul>
          <Link href={`/customer/${user.uid}/Orders`}>
            <li>Orders</li>
          </Link>
          <Link href={`/customer/${user.uid}/Invoices`}>
            <li>Invoices</li>
          </Link>
          <Link href={`/customer/${user.uid}/Reviews`}>
            <li>Reviews</li>
          </Link>
        </ul>
      </div>
      <div className="list">
        <div className="nav-section-header">
          <FaUser />
          <h3>Customer Information</h3>
        </div>
        <ul>
          <Link href={`/customer/${user.uid}/Details`}>
            <li>Personal Details</li>
          </Link>
          <Link href={`/customer/${user.uid}/AddressBook`}>
            <li>Address Book</li>
          </Link>
        </ul>
      </div>
      <div className="list">
        <div className="nav-section-header">
          <FaQuestionCircle />
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
