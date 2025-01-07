// src/components/ProductDetailComponent.js

import React, { useState } from "react";
import { FaCheck, FaExclamationTriangle, FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const ProductDetailComponent = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleBuyNow = () => {
    alert("Redirecting to checkout...");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50 flex items-center">
          <FaCheck className="mr-2" />
          Product added to cart successfully!
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-100 object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3";
                }}
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                Pharmaceutical Product
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-4 text-gray-600">{product.description}</p>

              <div className="mt-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">USD</span>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="flex items-center text-sm text-gray-600">
                    <MdLocalShipping className="mr-2" />
                    Free shipping on orders over $50
                  </p>
                  <p className="text-sm text-gray-600">
                    In Stock: {product.stock} units
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`w-full px-6 py-3 rounded-md flex items-center justify-center transition-colors duration-200 ${
                    addedToCart
                      ? "bg-green-100 text-green-800 border border-green-800"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <FaShoppingCart className="mr-2" />
                  {addedToCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>

              <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Product Details
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Dosage
                    </h3>
                    <p className="mt-1 text-gray-600">{product.dosage}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Usage
                    </h3>
                    <p className="mt-1 text-gray-600">{product.usage}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Warnings
                    </h3>
                    <div className="mt-2 space-y-2">
                      {product.warnings.map((warning, index) => (
                        <div
                          key={index}
                          className="flex items-center text-yellow-800 bg-yellow-50 px-4 py-2 rounded-md"
                        >
                          <FaExclamationTriangle className="mr-2" />
                          {warning}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
