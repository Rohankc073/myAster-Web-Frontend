import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between w-full shadow-md">
      {/* Logo Section */}
      <div className="text-white text-lg font-bold flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="h-10 w-10 mr-2"
        />
        <span>Admin Panel</span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        />
        <button className="absolute right-2 top-2 text-gray-400">
          🔍
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
