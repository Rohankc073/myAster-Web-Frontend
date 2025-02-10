import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ForgotPassword from "./components/ForgotPassword/forgotPassword";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/DashBoard";
import DoctorsPage from "./pages/Doctors";
import LoginPage from "./pages/Login";
import MedicineProductList from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/protected/AdminDashboard";
import AdminManageDoctors from "./pages/protected/AdminManageDoctors";
import AdminManageMedicines from "./pages/Protected/AdminManageProduct";
import ManageUsers from "./pages/Protected/AdminManageUsers";
import SignUpPage from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoutes";
function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/doctor" element={<DoctorsPage />} />
        <Route path="/product" element={<MedicineProductList />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />   
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/doctors" element={<AdminManageDoctors />} />
        <Route path="/admin/product" element={<AdminManageMedicines />} />


        
      </Routes>
    </Router>
  );
}

export default App;
