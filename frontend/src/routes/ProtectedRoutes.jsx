import React from "react";
import { Navigate } from "react-router-dom";

// Admin Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // If no token or no user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If user is not an Admin, redirect them to home
  if (user.role !== "Admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
