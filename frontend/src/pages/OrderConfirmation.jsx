import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return <p className="text-center text-gray-600">No order found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-center text-green-600">Order Placed Successfully!</h2>
          <p className="text-gray-600 text-center mt-2">Your order ID: <b>{order._id}</b></p>

          <h3 className="text-lg font-semibold mt-4">Order Summary:</h3>
          <ul className="mt-2">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between py-2 border-b">
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <p className="text-right font-bold mt-2">Total: ${order.total}</p>
          <p className="text-center text-gray-500 mt-4">Your order will be delivered soon!</p>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
