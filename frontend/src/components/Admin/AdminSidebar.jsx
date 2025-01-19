// src/components/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-3">
        <li><Link to="/admin" className="hover:bg-gray-700 p-2 block rounded">Dashboard</Link></li>
        <li><Link to="/admin/doctors" className="hover:bg-gray-700 p-2 block rounded">Manage Doctors</Link></li>
        <li><Link to="/admin/users" className="hover:bg-gray-700 p-2 block rounded">Manage Users</Link></li>
        <li><Link to="/admin/products" className="hover:bg-gray-700 p-2 block rounded">Manage Products</Link></li>
        <li><Link to="/admin/orders" className="hover:bg-gray-700 p-2 block rounded">Manage Orders</Link></li>
        <li><Link to="/admin/reports" className="hover:bg-gray-700 p-2 block rounded">Sales Reports</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
