import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBox, FaCalendarCheck, FaQuoteLeft, FaShoppingCart, FaStar, FaUserMd, FaUsers } from "react-icons/fa";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"; // ✅ Import Recharts
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [userStats, setUserStats] = useState([]); // ✅ User signup stats

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5003/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalUsers(response.data.length);

        // ✅ Process Data for Chart 📊
        const userCounts = {};
        response.data.forEach((user) => {
          const date = user.createdAt.split("T")[0]; // Extract date part only
          userCounts[date] = (userCounts[date] || 0) + 1; // Count users per day
        });

        // ✅ Format data for Recharts
        const chartData = Object.keys(userCounts).map((date) => ({
          date,
          users: userCounts[date],
        }));

        setUserStats(chartData);
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
    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <div className="w-64">
        <AdminSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        {/* ✅ Dashboard Cards */}
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

          {/* ✅ User Growth Chart 📊 */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Signups Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ User Reviews Section 🌟 */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md p-8 mt-8">
            <h3 className="text-2xl font-bold text-center mb-6">What Our Users Say</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <FaQuoteLeft className="text-3xl mb-2 opacity-75" />
                <p className="italic">"This platform has made my life so much easier. Highly recommended!"</p>
                <p className="font-bold mt-2">- John Doe</p>
                <div className="text-yellow-300 mt-2 flex justify-center">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
