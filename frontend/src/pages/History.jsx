import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")); // Parse user object
  const token = localStorage.getItem("token");

  // Extract user ID safely
  const userId = storedUser?._id;

  useEffect(() => {
    if (!userId || !token) {
      console.error("User not logged in or token missing");
      return;
    }
    fetchUserOrders();
    fetchUserAppointments();
  }, [userId]);

  // ✅ Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/order/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Ensure each order contains product details (name, image, quantity)
      const categorizedOrders = response.data.map((order) => ({
        ...order,
        status: order.status.toLowerCase(),
      }));

      // ✅ Sort orders by latest createdAt date
      categorizedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrders(categorizedOrders);
    } catch (error) {
      console.error("❌ Error fetching user orders:", error);
    }
  };

  // ✅ Fetch user appointments
  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/appointments/getAll?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // ✅ Ensure only this user's appointments are shown
      const userAppointments = response.data
        .filter((appointment) => appointment.userId?._id === userId) 
        .sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setAppointments(userAppointments);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching user appointments:", error);
    }
  };
  
  if (!userId) return <p className="text-red-500 text-center mt-4">Please log in to view your history.</p>;
  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6 mt-40">
      {/* 📌 Appointments Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Appointments</h2>
      {appointments.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-blue-600"> Dr.{appointment.doctorName}</h3>

              <p className="text-gray-600"> Problem: {appointment.problemDescription}</p>
              <div className="mt-3 text-gray-700">
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p className="font-semibold text-green-500">{appointment.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}

      {/* 📌 Orders Section */}
      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              {/* <h3 className="text-lg font-bold text-gray-900">Order ID: {order._id}</h3> */}
              <p className="text-gray-600"><strong>Status:</strong> <span className="text-green-600">{order.status}</span></p>
              <p className="text-gray-600"><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

              {/* ✅ Show Products Ordered in List Form */}
              <h4 className="text-lg font-semibold mt-4 mb-2">Products Ordered:</h4>
              <ul className="space-y-4">
                {order.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 border-b pb-2">
                    {/* ✅ Show Product Image */}
                    <img
                      src={item.productId.image || "https://via.placeholder.com/80"} // Default image if not available
                      alt={item.productId.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-gray-900 font-medium">{item.productId.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity} pcs</p>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
    <Footer />
    </>
  );
};

export default History;
