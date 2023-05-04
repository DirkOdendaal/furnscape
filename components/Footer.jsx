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
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillFacebook />
      </p>
    </div>
  );
};

export default Footer;
