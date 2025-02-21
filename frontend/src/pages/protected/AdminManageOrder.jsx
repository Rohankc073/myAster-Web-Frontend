import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5003/order/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`http://localhost:5003/order/status/${orderId}`, { status });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* ✅ Sidebar */}
        <div className="w-64">
          <AdminSidebar />
        </div>

        {/* ✅ Main Content */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders</h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="border p-3">Order ID</th>
                    <th className="border p-3">User Name</th>
                    <th className="border p-3">User Email</th>
                    <th className="border p-3">Total</th>
                    <th className="border p-3">Shipping Address</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border hover:bg-gray-100 transition">
                      <td className="border p-3 text-sm">{order._id}</td>
                      <td className="border p-3 text-sm font-semibold">{order.userId?.name || "Unknown"}</td>
                      <td className="border p-3 text-sm">{order.userId?.email || "No Email"}</td>
                      <td className="border p-3 text-sm">${order.total}</td>
                      <td className="border p-3 text-sm">{order.shippingAddress}</td>
                      <td className="border p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="p-2 border rounded-lg text-sm bg-gray-100"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                          onClick={() => updateOrderStatus(order._id, "Cancelled")}
                        >
                          Cancel Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
