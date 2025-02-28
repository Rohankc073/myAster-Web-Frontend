import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <p className="text-center text-gray-600 min-h-screen flex items-center justify-center">
        No order found.
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
          {/* Order Success Message */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h2>
            <p className="text-gray-700 mt-2">
              Thank you for your purchase! Your order will be delivered soon.
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Order ID:</strong> <span className="text-blue-600">{order._id}</span>
            </p>
            
          </div>

          {/* Order Summary Section */}
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">🛍 Order Summary</h3>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm border gap-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.image || "/images/m1.jpg"} // ✅ Fetch product image
                    // alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover border shadow-md"
                    
                  />

                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                  </div>

                  {/* Product Price */}
                  <span className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center border-t mt-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Amount:</h3>
              <span className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 mt-6"
          >
            🔙 Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
