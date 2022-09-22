import React from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { Cart } from "./";
import Image from "next/image";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { showCart, setShowCart } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="navbar-children-right">
        <button type="button" className="navbar-buttons">
          <AiOutlineMenu />
        </button>
        <button type="button" className="btn">
          Sell on Furnscape?
        </button>
      </div>
      <Link href="/">
        <div className="navbar-logo">
          <Image src="/fs6.jpeg" width={190} height={0} priority={true}></Image>
        </div>
      </Link>
      <div className="navbar-children-right">
        {user ? (
          <>
            <button
              type="button"
              className="btn"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </button>
            <Link href="/Account">
              <button type="button" className="btn">
                Account
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/Login">
              <button type="button" className="btn">
                Login
              </button>
            </Link>
            <Link href="/Signup">
              <button type="button" className="btn">
                Signup
              </button>
            </Link>
          </>
        )}

        <button
          type="button"
          className="navbar-buttons"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShoppingCart />
          <span className="cart-item-qty">0</span>
        </button>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
