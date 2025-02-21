import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Retrieve userId from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          alert("User not logged in. Please log in.");
          return;
        }

        const user = JSON.parse(storedUser);
        const userId = user._id; // Extract userId

        console.log("Fetching cart for user:", userId);

        // Fetch cart from API
        const response = await axios.get(`http://localhost:5003/cart/${userId}`);

        setCartItems(response.data.items); // Update state with cart items
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);


  
  // Function to update quantity
  const updateQuantity = async (id, amount) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      );
      setCartItems(updatedCart);

      // Send API request to update quantity
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id;

      await axios.put("http://localhost:5003/cart/update", {
        userId,
        productId: id,
        quantity: updatedCart.find((item) => item.productId === id).quantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Function to remove item from cart
  const removeItem = async (id) => {
    try {
      setCartItems(cartItems.filter((item) => item.productId !== id));

      // Send API request to remove item
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id;

      await axios.delete("http://localhost:5003/cart/remove", {
        data: { userId, productId: id },
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function to navigate to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          {loading ? (
            <p className="text-center text-gray-600 dark:text-white">Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-white">Your cart is empty.</p>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start">
              {/* Cart Items */}
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img
  src={item.productId?.image || "https://via.placeholder.com/80"} // ✅ Fetch product image correctly
  alt={item.productId?.name}
  className="w-20 h-20 rounded-lg object-cover border"
/>


                        {/* Quantity Control */}
                        <div className="flex items-center md:justify-end">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="h-7 w-7 rounded-md border bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-2 w-10 text-center text-sm font-medium text-gray-900 dark:text-white"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="h-7 w-7 rounded-md border bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-end md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ${item.price * item.quantity}
                          </p>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-4 md:max-w-md">
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>

                          {/* Remove Button */}
                          <div className="flex items-center gap-4">
                            <button
                              className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              onClick={() => removeItem(item.productId)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mx-auto max-w-4xl lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Summary
                  </p>

                  {/* Price Calculation */}
                  <div className="space-y-4">
                    <dl className="flex justify-between">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                      </dd>
                    </dl>

                    <dl className="flex justify-between border-t pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                      </dd>
                    </dl>
                  </div>

                  {/* Checkout Button */}
                  <button
  onClick={handleCheckout}
  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
>
  Proceed to Checkout
</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
