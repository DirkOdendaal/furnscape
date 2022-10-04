import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { FaShoppingCart,FaWarehouse, FaUser, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";

const SupplierAccount = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user || user.role != "supplier") {
      router.push("/Login");
    }
  }, [router, user]);

  return (
    <>
      {user ? (
        <div className="account-details-container">
          <div className="account-details-card account-card">
            <div className="account-details-card-header">
              <h3>Products</h3>
              <FaWarehouse />
            </div>
            <div>
              <ul>
                <Link href="/">
                  <li>Products</li>
                </Link>
                <Link href="/">
                  <li>Reviews</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="account-details-card account-card">
            <div className="account-details-card-header">
              <h3>Orders</h3>
              <FaShoppingCart />
            </div>
            <div>
              <ul>
                <Link href="/">
                  <li>Orders</li>
                </Link>
                <Link href="/">
                  <li>Invoices</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="account-details-card account-card">
            <div className="account-details-card-header">
              <h3>Supplier Information</h3>
              <FaUser />
            </div>
            <div>
              <ul>
                <Link href="/">
                  <li>Supplier Details</li>
                </Link>
                <Link href="/">
                  <li>Address book</li>
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
                <Link href="/">
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

export default SupplierAccount;
