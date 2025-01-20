// src/pages/AdminDashboard.jsx
import React from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
       
      </div>
    </div>
  );
};

export default AdminDashboard;
