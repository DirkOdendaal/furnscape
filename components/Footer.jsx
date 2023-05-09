import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import { useStateContext } from "../context/StateContext";

const Footer = () => {
  const { error } = useStateContext();

  if (error) {
    return null;
  }

  return (
    <div className="footer-container">
      <p>Furnscape Pty Ltd. All Rights Reserved.</p>
      <p className="icons">
        <AiFillInstagram data-testid="instagram-icon" />
        <AiOutlineTwitter data-testid="twitter-icon" />
        <AiFillFacebook data-testid="facebook-icon" />
      </p>
    </div>
  );
};

export default Footer;
