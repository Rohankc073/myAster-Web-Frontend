import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/DashBoard";
import DoctorsPage from "./pages/Doctors";
import LoginPage from "./pages/Login";
import MedicineProductList from "./pages/Product";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/protected/AdminDashboard";
import AdminManageDoctors from "./pages/Protected/AdminManageDoctors";
import AdminManageMedicines from "./pages/Protected/AdminManageProduct";
import ManageUsers from "./pages/Protected/AdminManageUsers";
import SignUpPage from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If token exists, user is authenticated
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/doctor" element={<DoctorsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<MedicineProductList />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={isAuthenticated ? <ProtectedRoute><AdminDashboard /></ProtectedRoute> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/users"
          element={isAuthenticated ? <ProtectedRoute><ManageUsers /></ProtectedRoute> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/doctors"
          element={isAuthenticated ? <ProtectedRoute><AdminManageDoctors /></ProtectedRoute> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/product"
          element={isAuthenticated ? <ProtectedRoute><AdminManageMedicines /></ProtectedRoute> : <Navigate to="/login" />}
        />
        
        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
