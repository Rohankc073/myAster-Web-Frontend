import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ForgotPassword from "./components/ForgotPassword/forgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/DashBoard";
import DoctorsPage from "./pages/Doctors";
import LoginPage from "./pages/Login";
import ProductPage from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import SignUpPage from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LoginPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        
        <Route path="/home" element={<Dashboard />} />
        <Route path="/doctor" element={<DoctorsPage />} />
        <Route path="/product" element={<ProductPage />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />   
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
