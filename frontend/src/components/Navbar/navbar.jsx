import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to detect routes
import Button from "../Button/button"; // Import the reusable Button component

const Navbar = () => {
  const location = useLocation();

  // Check if the current route is /home (Dashboard)
  const isDashboard = location.pathname === "/home";

  return (
    <nav
      className={`${
        isDashboard ? "bg-blue-80" : "bg-white"
      } fixed w-full z-50 top-0 transition-colors duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3">
          <img src="/images/logo1.png" className="h-10" alt="myAster Logo" />
        </a>

        {/* Navigation Links */}
        <div className="items-center hidden md:flex space-x-8">
          <a
            href="/home"
            className={`${
              isDashboard ? "text-black" : "text-blue-700"
            } underline font-medium hover:text-blue-500`}
          >
            Home
          </a>
          <a
            href="/doctor"
            className={`${
              isDashboard ? "text-black" : "text-gray-700"
            } font-medium hover:text-blue-500`}
          >
            Doctor
          </a>
          <a
            href="/medicine"
            className={`${
              isDashboard ? "text-black" : "text-gray-700"
            } font-medium hover:text-blue-500`}
          >
            Medicine
          </a>
          <a
            href="/history"
            className={`${
              isDashboard ? "text-black" : "text-gray-700"
            } font-medium hover:text-blue-500`}
          >
            History
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* Log in Button */}
          <Button
            label="Log in"
            variant={isDashboard ? "secondary" : "secondary"} // Adjust styles
          />

          {/* Sign up Button */}
          <Button
            label="Sign up"
            variant={isDashboard ? "primary" : "primary"} // Adjust styles
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
