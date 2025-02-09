import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Cart Icon
import { useLocation, useNavigate } from "react-router-dom"; // Navigation
import Button from "../Button/button"; // Reusable Button Component

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is logged in by looking for the token in localStorage
  const isLoggedIn = localStorage.getItem("token") !== null;

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page after logout
  };

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
        <a href="/home" className="flex items-center space-x-3">
          <img src="/images/logo1.png" className="h-10" alt="myAster Logo" />
        </a>

        {/* Navigation Links */}
        <div className="items-center hidden md:flex space-x-8">
          <a href="/home" className={`${isDashboard ? "text-black" : "text-blue-700"} underline font-medium hover:text-blue-500`}>
            Home
          </a>
          <a href="/doctor" className={`${isDashboard ? "text-black" : "text-gray-700"} font-medium hover:text-blue-500`}>
            Doctor
          </a>
          <a href="/product" className={`${isDashboard ? "text-black" : "text-gray-700"} font-medium hover:text-blue-500`}>
            Medicine
          </a>
          <a href="/history" className={`${isDashboard ? "text-black" : "text-gray-700"} font-medium hover:text-blue-500`}>
            History
          </a>
          <a href="/contactus" className={`${isDashboard ? "text-black" : "text-gray-700"} font-medium hover:text-blue-500`}>
            Contact Us
          </a>
        </div>

        {/* Authentication & Cart Section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Show Cart Button when logged in */}
              <button onClick={() => navigate("/cart")} className="p-2">
                <FaShoppingCart className="w-6 h-6 text-blue-600" />
              </button>

              {/* Logout Button Styled Like Signup */}
              <Button label="Logout" variant="primary" onClick={handleLogout} />
            </>
          ) : (
            // Show Login & Signup when not logged in
            <>
              <Button label="Log in" variant="secondary" onClick={() => navigate("/login")} />
              <Button label="Sign up" variant="primary" onClick={() => navigate("/signup")} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
