import React from "react";
import { Navigate } from "react-router-dom";

// Admin Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || user.role !== "Admin") {
    alert("Unauthorized! Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
