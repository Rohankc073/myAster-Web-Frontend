import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const CartPage = () => {
  const navigate = useNavigate();

  // Dummy cart items (Will be replaced with API data later)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apple iMac 24'' Retina 4.5K",
      description: "Apple M3, 8GB RAM, 256GB SSD, 10-core GPU",
      price: 1499,
      quantity: 1,
      image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    },
    {
      id: 2,
      name: "Apple MacBook Pro 16'' M3",
      description: "Apple M3, 16GB RAM, 512GB SSD, 14-core GPU",
      price: 2499,
      quantity: 1,
      image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg",
    },
  ]);

  // Function to update quantity
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to navigate to checkout
  const handleCheckout = () => {
    console.log("Checkout button clicked");

    if (cartItems.length > 0) {
      console.log("Navigating to /checkout with items:", cartItems);
      navigate("/checkout", { state: { cartItems } }); 
    } else {
      console.warn("Cart is empty, cannot proceed!");
      alert("Your cart is empty!");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start">
            {/* Cart Items */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img className="h-20 w-20" src={item.image} alt={item.name} />

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

                        {/* Remove Button (Same as Checkout Page) */}
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

                  <dl className="flex justify-between">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>

                  <dl className="flex justify-between border-t pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 99}
                    </dd>
                  </dl>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
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

export default CartPage;
