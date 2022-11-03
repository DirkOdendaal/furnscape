import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaQuestionCircle, FaWarehouse, } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const CustomerAccountNav = () => {
  const { user } = useAuth();
  const [userRoute, setRoute] = useState();

  useEffect(() => {
    if (user?.role == "cutomer") {
      setRoute("customer");
    } else {
      setRoute("supplier");
    }
  }, [user]);

  return (
    <div className="nav-account-details">
      <div className="nav-account-details-header">
        <h2>My Account</h2>
      </div>
      {userRoute === "supplier" ? (
        <div>
          <div className="list">
            <div className="nav-section-header">
              <FaWarehouse />
              <h3>Products</h3>
            </div>
            <ul>
              <Link href={`/${userRoute}/${user?.uid}/Orders`}>
                <li>Products</li>
              </Link>
              <Link href={`/${userRoute}/${user?.uid}/Invoices`}>
                <li>Invoices</li>
              </Link>
            </ul>
          </div>
        </div>
      ) : null}
      <div className="list">
        <div className="nav-section-header">
          <FaShoppingCart />
          <h3>Orders</h3>
        </div>
        <ul>
          <Link href={`/${userRoute}/${user?.uid}/Orders`}>
            <li>Orders</li>
          </Link>
          <Link href={`/${userRoute}/${user?.uid}/Invoices`}>
            <li>Invoices</li>
          </Link>
          <Link href={`/${userRoute}/${user?.uid}/Reviews`}>
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
          <Link href={`/${userRoute}/${user?.uid}/Details`}>
            <li>Personal Details</li>
          </Link>
          <Link href={`/${userRoute}/${user?.uid}/AddressBook`}>
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
