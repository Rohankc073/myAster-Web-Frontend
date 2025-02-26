import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUpdatedUser(storedUser);

      fetchCart(storedUser._id);
      fetchOrders(storedUser._id);
    }

    setLoading(false);
  }, []);

  const fetchCart = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5003/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5003/orders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5003/user/update/${updatedUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center mt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Profile Information</h2>
          <ToastContainer position="top-right" autoClose={3000} />

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="space-y-6">
              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="border border-gray-300 p-3 w-full bg-gray-100 rounded-lg">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email (Cannot be changed)</label>
                  <p className="border border-gray-300 p-3 w-full bg-gray-100 rounded-lg">{user.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={updatedUser.phone || ""}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="border border-gray-300 p-3 w-full bg-gray-100 rounded-lg">
                      {user.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Edit Profile
                    </button>
                    {/* ✅ Change Password Button */}
                    <button
                      onClick={() => navigate("/forgot-password")} // Redirect to Forgot Password page
                      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Change Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User's Cart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h3>
          {cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="flex justify-between p-3">
                  <span className="text-gray-700 font-medium">{item.name || "Unnamed Product"}</span>
                  <span className="text-gray-900 font-bold">${item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* User's Orders */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h3>
          {orders.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order._id} className="flex justify-between p-3">
                  <span className="text-gray-700">Order #{order._id}</span>
                  <span className="text-green-600 font-bold">{order.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No orders placed yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
