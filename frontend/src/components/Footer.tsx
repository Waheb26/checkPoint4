import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTwitch,
  FaGithub,
} from "react-icons/fa";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <FaFacebook size={25} />
      <FaInstagram size={25} />
      <FaSnapchat size={25} />
      <FaTwitch size={25} />
      <FaGithub size={25} />
    </footer>
  );
};

export default Footer;
