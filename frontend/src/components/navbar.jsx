import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/images/logo1.png" alt="myAster Logo" className="logo-image" />
        <div className="logo-text">
          
          
        </div>
      </div>
      <nav>
        <ul className="nav-links">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Clinical Test</li>
          <li>Contact Us</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
