import React from "react";
import Button from "../Button/button"; // Import the reusable Button component

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-50 top-0 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3">
          <img src="/images/logo1.png" className="h-10" alt="myAster Logo" />
        </a>

        {/* Navigation Links */}
        <div className="items-center hidden md:flex space-x-8">
          <a
            href="#"
            className="text-blue-700 underline font-medium hover:text-blue-800"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 font-medium hover:text-blue-700"
          >
            Doctor
          </a>
          <a
            href="#"
            className="text-gray-700 font-medium hover:text-blue-700"
          >
            Medicine
          </a>
          <a
            href="#"
            className="text-gray-700 font-medium hover:text-blue-700"
          >
            History
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* Log in Button (Using secondary variant) */}
          <Button label="Log in" variant="secondary" />

          {/* Sign up Button (Using primary variant) */}
          <Button label="Sign up" variant="primary" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
