import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import {
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Menu = () => {
  const { setShowMenu, catagories, setCurrentRoute } = useStateContext();
  const [expandedCategories, setExpandedCategories] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleBack = () => {
    setExpandedCategories(false);
  };

  return (
    <div className="cart-wrapper">
      <div className="menu-container">
        <div className="menu-flyout-heading">
          <AiOutlineArrowLeft
            className="navbar-buttons"
            onClick={() => handleBack()}
          />
          <Link href="/">
            <div className="navbar-logo">
              <Image
                src="/furnscape/fs6.jpeg"
                width={190}
                height={35}
                alt={""}
                priority={true}
              ></Image>
            </div>
          </Link>
          <AiOutlineClose
            className="navbar-buttons"
            onClick={() => setShowMenu(false)}
          />
        </div>
        {expandedCategories ? (
          <div className="menu-section">
            {catagories?.map((cat, index) => (
              <span key={index}>{cat.name}</span>
            ))}
          </div>
        ) : (
          <div className="menu-section">
            <span onClick={() => setExpandedCategories(true)}>
              Categories <AiOutlineArrowRight />
            </span>
            <span>Item</span>
            <span>Item</span>
            <span>Item</span>
            <span>Item</span>
          </div>
        )}
        {user ? (
          <>
            <div className="menu-section">
              {user.role === "customer" ? (
                <Link href={`/customer/${user.uid}`}>
                  <span
                    onClick={() => {
                      setShowMenu(false);
                    }}
                  >
                    Account <FaUser />
                  </span>
                </Link>
              ) : (
                <Link href={`/supplier/${user.uid}`}>
                  <span
                    onClick={() => {
                      setShowMenu(false);
                    }}
                  >
                    Account <FaUser />
                  </span>
                </Link>
              )}
            </div>
            <div className="menu-section">
              <span
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
              >
                Logout <FiLogOut />
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="menu-section">
              <Link href="/Login">
                <span
                  onClick={() => {
                    setCurrentRoute(router.asPath);
                    setShowMenu(false);
                  }}
                >
                  Login <FiLogIn />
                </span>
              </Link>
              <Link href="/Signup">
                <span
                  onClick={() => {
                    setCurrentRoute(router.asPath);
                    setShowMenu(false);
                  }}
                >
                  Register <FaUser />
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
