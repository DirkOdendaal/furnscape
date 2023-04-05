import React from "react";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { Cart, Menu } from "./";
import Image from "next/image";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const {
    showCart,
    setShowCart,
    showMenu,
    setShowMenu,
    totalQuantity,
    setCurrentRoute,
  } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="navbar-children-left">
        <button
          type="button"
          className="navbar-buttons"
          id="nav-menu-button"
          onClick={() => setShowMenu(true)}
        >
          <AiOutlineMenu />
        </button>
        {user?.role !== "supplier" ? (
          <button type="button" className="sell-button" id="nav-button">
            Sell on Furnscape?
          </button>
        ) : null}
      </div>
      <Link href="/">
        <div className="navbar-logo">
          <Image
            src="/furnscape/fs6.jpeg"
            width={190}
            height={33}
            alt={""}
            priority
          ></Image>
        </div>
      </Link>
      <div className="navbar-children-right">
        <div className="dropdown">
          <button className="sell-button" id="nav-button">
            My Account
          </button>
          <div className="dropdown-content">
            {user ? (
              <>
                {user.role === "customer" ? (
                  <Link href={`/customer/${user.uid}`}>
                    <button type="button" className="btnDrop">
                      Account
                    </button>
                  </Link>
                ) : (
                  <Link href={`/supplier/${user.uid}`}>
                    <button type="button" className="btnDrop">
                      Account
                    </button>
                  </Link>
                )}
                <button
                  type="button"
                  className="btnDrop"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/Login">
                  <button
                    type="button"
                    className="btnDrop"
                    onClick={() => {
                      setCurrentRoute(router.asPath);
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link href="/Signup">
                  <button type="button" className="btnDrop">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          className="navbar-buttons"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShoppingCart />
          {totalQuantity > 0 ? (
            <span className="cart-item-qty">{totalQuantity}</span>
          ) : null}
        </button>
        {showCart && <Cart />}
        {showMenu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
