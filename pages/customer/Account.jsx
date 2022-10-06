import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaShoppingCart, FaUser, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";

const Account = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);

  return (
    <>
      {user ? (
        <div className="account-details-container">
          <div className="account-details-card account-card">
            <div className="account-details-card-header">
              <h3>Orders</h3>
              <FaShoppingCart />
            </div>
            <div>
              <ul>
                <Link href="./Orders">
                  <li>Orders</li>
                </Link>
                <Link href="./Invoices">
                  <li>Invoices</li>
                </Link>
                <Link href="./Reviews">
                  <li>Reviews</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="account-details-card account-card">
            <div className="account-details-card-header">
              <h3>Customer Information</h3>
              <FaUser />
            </div>
            <div>
              <ul>
                <Link href="./Details">
                  <li>Personal Details</li>
                </Link>
                <Link href="./AddressBook">
                  <li>Address Book</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="account-details-card account-card">
            <div className="account-details-card-header">
              <h3>Help</h3>
              <FaQuestionCircle />
            </div>
            <div>
              <ul>
                <Link href="../Help">
                  <li>Help</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Account;
