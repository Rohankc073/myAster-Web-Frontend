import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default: Cash on Delivery

  useEffect(() => {
    const fetchCart = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("User not logged in. Please log in.");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id;

      try {
        const response = await axios.get(`http://localhost:5003/cart/${userId}`);
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not logged in.");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user._id;

    if (!shippingAddress) {
      alert("Please enter your shipping address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5003/order/add", {
        userId,
        shippingAddress,
        paymentMethod,
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/order-confirmation", { state: { order: response.data.order } });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 mt-20">
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

          {/* Shipping Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your shipping address"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          {/* Order Summary */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <ul className="mt-2">
              {cartItems.map((item) => (
                <li key={item.productId} className="flex justify-between py-2 border-b">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="text-right font-bold mt-2">
              Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </p>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
