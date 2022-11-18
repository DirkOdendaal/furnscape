import React from "react";
import { useStateContext } from "../context/StateContext";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  const { setShowMenu, catagories } = useStateContext();
  return (
    <div className="cart-wrapper">
      <div className="menu-container">
        <div className="menu-flyout-heading" onClick={() => setShowMenu(false)}>
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
          <AiOutlineClose className="navbar-buttons" />
        </div>

        <div className="menu-section">
          <a>
            Item <AiOutlineArrowRight />
          </a>
          <a>Item</a>
          <a>Item</a>
          <a>Item</a>
          <a>Item</a>
        </div>
        <div className="menu-section">
          <a>Item</a>
          <a>Item</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
