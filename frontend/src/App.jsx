import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookAppointmentPage from "./pages/Appointment";
import AppointmentSuccess from "./pages/AppointmentSuccess";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/DashBoard";
import DoctorsPage from "./pages/Doctors";
import ForgotPassword from "./pages/ForgotPassword"; // ✅ Import Forgot Password Page
import History from "./pages/History";
import LoginPage from "./pages/Login";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import MedicineProductList from "./pages/Product";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/protected/AdminDashboard";
import ManageAppointmentsPage from "./pages/Protected/AdminManageAppointment";
import AdminManageDoctors from "./pages/Protected/AdminManageDoctors";
import AdminOrders from "./pages/Protected/AdminManageOrder";
import AdminManageMedicines from "./pages/Protected/AdminManageProduct";
import ManageUsers from "./pages/Protected/AdminManageUsers";
import ResetPassword from "./pages/ResetPassword";
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
        <Route path="/history" element={<History />} />
        <Route path="/doctor" element={<DoctorsPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<MedicineProductList />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/appointment" element={<ManageAppointmentsPage />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
        <Route path="/appointment-success" element={<AppointmentSuccess />} />
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
