import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBox, FaCalendarCheck, FaShoppingCart, FaUserMd, FaUsers } from "react-icons/fa"; // ✅ Import Appointment Icon
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0); // ✅ State for Appointments

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5003/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalUsers(response.data.length);
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

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5003/order/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalOrders(response.data.length);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5003/appointments/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalAppointments(response.data.length);
      } catch (error) {
        console.error("❌ Error fetching appointments:", error);
      }
    };

    fetchUsers();
    fetchProducts();
    fetchDoctors();
    fetchOrders();
    fetchAppointments(); // ✅ Fetch appointments
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar with fixed width */}
      <div className="w-64">
        <AdminSidebar />
      </div>

      {/* ✅ Main Content taking full space */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        {/* ✅ Ensuring proper margin to avoid overlap */}
        <div className="p-8 bg-gray-100 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

            {/* ✅ Total Orders */}
            <div className="bg-purple-500 text-white rounded-lg p-6 flex items-center shadow-md">
              <FaShoppingCart className="text-4xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
            </div>

            {/* ✅ Total Appointments */}
            <div className="bg-yellow-500 text-white rounded-lg p-6 flex items-center shadow-md">
              <FaCalendarCheck className="text-4xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Appointments</h2>
                <p className="text-2xl font-bold">{totalAppointments}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
