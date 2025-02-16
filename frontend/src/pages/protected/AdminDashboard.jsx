import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBox, FaUserMd, FaUsers } from "react-icons/fa";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  const token = localStorage.getItem("token");

  // ✅ Fetch Total Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5003/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalUsers(response.data.length); // Assuming it returns an array of users
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5003/products/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5003/doctors/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalDoctors(response.data.length);
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
      }
    };

    fetchUsers();
    fetchProducts();
    fetchDoctors();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <AdminNavbar />

        {/* Content Section */}
        <div className="p-6 bg-gray-100 flex-1">
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Users */}
            <div className="bg-blue-500 text-white rounded-lg p-6 flex items-center shadow-md">
              <FaUsers className="text-4xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-green-500 text-white rounded-lg p-6 flex items-center shadow-md">
              <FaBox className="text-4xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>

            {/* Total Doctors */}
            <div className="bg-red-500 text-white rounded-lg p-6 flex items-center shadow-md">
              <FaUserMd className="text-4xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Doctors</h2>
                <p className="text-2xl font-bold">{totalDoctors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
