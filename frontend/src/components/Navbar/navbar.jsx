import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white-50 dark:bg-white-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
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
          <button
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-100 font-medium rounded-lg text-sm px-4 py-2"
          >
            Log in
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
