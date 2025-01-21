import React from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed) */}
      <AdminSidebar />

      {/* Main Content Area - Pushes Right */}
      <div className="flex-1 flex flex-col ml-64"> 
        {/* Navbar (Now Fully Spaced) */}
        <AdminNavbar />

        {/* Content Section */}
        <div className="p-6 bg-gray-100 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
