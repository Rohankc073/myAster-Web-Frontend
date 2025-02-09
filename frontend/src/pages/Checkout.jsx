import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ Correct way to use it inside component
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const CheckoutPage = () => {
  const location = useLocation(); // ✅ Move inside component
  const cartItems = location.state?.cartItems || []; // ✅ Get cart items from state

  // Dummy cart data (Only used if there's no cart data from previous page)
  const [cart, setCart] = useState(
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: 1,
            name: "Apple iMac 24'' Retina 4.5K",
            description: "Apple M3, 8GB RAM, 256GB SSD, 10-core GPU",
            price: 1499,
            quantity: 1,
            image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
          },
        ]
  );

  // Function to update quantity
  const updateQuantity = (id, amount) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Function to remove item
  const removeItem = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />

      {/* Checkout Page Container */}
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Checkout
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start">
            {/* Checkout Items Section (Editable Cart) */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img
                        className="h-20 w-20"
                        src={item.image}
                        alt={item.name}
                      />

                      {/* Quantity Control */}
                      <div className="flex items-center md:justify-end">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
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
                          onClick={() => updateQuantity(item.id, 1)}
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

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                          <button
                            className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => removeItem(item.id)}
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

            {/* Order Summary & Payment Section */}
            <div className="mx-auto mt-6 max-w-4xl lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </p>

                {/* Price Calculation */}
                <div className="space-y-4">
                  <dl className="flex justify-between">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                    </dd>
                  </dl>

                  <dl className="flex justify-between">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Shipping
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      Free
                    </dd>
                  </dl>

                  <dl className="flex justify-between border-t pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                    </dd>
                  </dl>
                </div>

                {/* Payment Button */}
                <button 
  onClick={() => {
    console.log("Navigating to checkout..."); // ✅ Debugging log
    navigate("/checkout"); // ✅ Ensure this works
  }} 
  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
>
  Proceed to Checkout
</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CheckoutPage;
