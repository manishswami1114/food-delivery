import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          {/* <img src={logo} alt="" className="logo" /> */}
          <p>
          The company itself is a very successful company. They leave with hatred, the opening of him, in which we accuse him of pleasures, as if our least choice of happiness is the least of great duties and the like. He hates it.
          </p>
          <div className="footer-content-socials">
            <FaFacebook className="footer-socials"/>
            <FaLinkedin className="footer-socials"/>
            <FaSquareInstagram className="footer-socials" />
            <FaTwitter className="footer-socials" />
          </div>
        </div>
        <div className="footer-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+917568873288</li>
            <li>contact@DineDivine.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        Copyright 2024 @ DineDivine.com- All Right Reserved
      </div>
    </div>
  );
};

export default Footer;
