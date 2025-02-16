import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <nav className="bg-white p-4 flex items-center justify-between w-full shadow-md">
      {/* ✅ Logo Section */}
      <div className="text-white text-lg font-bold flex items-center">
        <img
          src="/images/logo1.png" // Make sure this file exists in /public/images/
          alt="Admin Logo"
          className="h-12 w-15 object-contain mr-2"
        />
        
      </div>

      {/* ✅ Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-64 rounded-lg border border--500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white-800 text-black"
        />
        <button
          type="submit"
          className="absolute right-3 top-3 text-gray-300 hover:text-white transition"
        >
          <FaSearch />
        </button>
      </form>
    </nav>
  );
};

export default AdminNavbar;
