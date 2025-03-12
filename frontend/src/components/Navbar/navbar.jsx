import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Icons
import { useLocation, useNavigate } from "react-router-dom"; // Navigation
import Button from "../Button/button"; // Reusable Button Component

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // ✅ Safely parse user
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // Clear invalid data
        setUser(null);
      }
    }
  }, []);

  const isLoggedIn = user !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  };

  const isDashboard = location.pathname === "/home";

  // Function to set active link dynamically
  const getNavLinkClass = (path) =>
    location.pathname === path ? "text-blue-700 font-medium" : "text-gray-700 font-medium hover:text-blue-500";

  return (
    <nav className={`${isDashboard ? "bg-blue-80" : "bg-white"} fixed w-full z-50 top-0 transition-colors duration-300`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/home" className="flex items-center space-x-3">
          <img src="/images/logo1.png" className="h-10" alt="myAster Logo" />
        </a>

        <div className="items-center hidden md:flex space-x-8">
          <a href="/home" className={getNavLinkClass("/home")}>Home</a>
          <a href="/doctor" className={getNavLinkClass("/doctor")}>Doctor</a>
          <a href="/product" className={getNavLinkClass("/product")}>Medicine</a>
          <a href="/packages" className={getNavLinkClass("/packages")}>Packages</a>  {/* ✅ New Packages Link */}
          <a href="/history" className={getNavLinkClass("/history")}>History</a>
          <a href="/contactus" className={getNavLinkClass("/contactus")}>Contact Us</a>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/profile")} className="flex items-center space-x-2">
                <FaUserCircle className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-800">{user.name}</span>
              </button>

              <button onClick={() => navigate("/cart")} className="p-2">
                <FaShoppingCart className="w-6 h-6 text-blue-600" />
              </button>

              <Button label="Logout" variant="primary" onClick={handleLogout} />
            </>
          ) : (
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
