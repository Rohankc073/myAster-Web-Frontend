import React, { useState } from "react";
import {
  FaBars,
  FaBoxes,
  FaChartBar,
  FaShoppingCart,
  FaTimes,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white transition-transform sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-4">Admin Panel</h2>

          <ul className="space-y-3 font-medium">
            <li>
              <Link to="/admin" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FaChartBar className="w-5 h-5 text-gray-400" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/doctors" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FaUserMd className="w-5 h-5 text-gray-400" />
                <span className="ml-3">Manage Doctors</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FaUsers className="w-5 h-5 text-gray-400" />
                <span className="ml-3">Manage Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/product" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FaBoxes className="w-5 h-5 text-gray-400" />
                <span className="ml-3">Manage Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FaShoppingCart className="w-5 h-5 text-gray-400" />
                <span className="ml-3">Manage Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FaChartBar className="w-5 h-5 text-gray-400" />
                <span className="ml-3">Sales Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
