import React from "react";

const Button = ({ label, variant = "primary", onClick, className }) => {
  // Define classes for different button variants
  const variants = {
    primary:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5",
    secondary:
      "text-blue-700 border border-blue-700 hover:bg-blue-100 font-medium rounded-lg text-sm px-4 py-2",
    outline:
      "text-gray-700 border border-gray-700 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2",
    // Add more variants as needed
  };

  return (
    <button
      type="button"
      className={`${variants[variant]} ${className}`} // Apply the appropriate variant and additional custom classes
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
