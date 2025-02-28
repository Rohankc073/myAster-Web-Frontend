import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

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
  
    if (!shippingAddress) {
      alert("Please enter your shipping address.");
      return;
    }
  
    const user = JSON.parse(storedUser);
    const userId = user._id;
  
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image ? `http://localhost:5003/${item.image}` : "https://via.placeholder.com/80", // ✅ Ensures full path
    }));
  
    try {
      const response = await axios.post("http://localhost:5003/order/add", {
        userId,
        shippingAddress,
        paymentMethod,
        items: orderItems, // ✅ Include images
        total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
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
      <div className="min-h-screen bg-gray-100 py-10 mt-20 flex justify-center">
        <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h2>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} className="p-3 border border-gray-300 rounded" placeholder="House No" />
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="p-3 border border-gray-300 rounded" placeholder="Street" />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="p-3 border border-gray-300 rounded" placeholder="City" />
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="p-3 border border-gray-300 rounded" placeholder="State" />
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="p-3 border border-gray-300 rounded" placeholder="ZIP Code" />
            <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} className="p-3 border border-gray-300 rounded" placeholder="Full Address" />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-3 border border-gray-300 rounded mt-1">
              <option value="COD">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <ul className="mt-2 divide-y">
              {cartItems.map((item) => (
                <li key={item.productId} className="flex justify-between py-3">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="text-right font-bold mt-3 text-lg">
              Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </p>
          </div>

          <button onClick={handlePlaceOrder} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mt-6 text-lg font-semibold">
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
