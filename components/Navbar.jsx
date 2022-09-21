import React from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import Link from "next/Link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="navbar-container">
      <button type="button" className="navbar-buttons">
        <AiOutlineMenu />
      </button>
      <Link href="/">
        <div>Furnscape</div>
      </Link>
      <div className="navbar-children-right">
        {user ? (
          <>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </button>
            <Link href="/Account">
              <button type="button">Account</button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/Login">
              <button type="button">Login</button>
            </Link>
            <Link href="/Signup">
              <button type="button">Signup</button>
            </Link>
          </>
        )}

        <button type="button" className="navbar-buttons">
          <AiOutlineShoppingCart />
          <span className="cart-item-qty">0</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
