import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>Furnscape Pty Ltd. All Rights Reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillFacebook />
      </p>
    </div>
  );
};

export default Footer;
