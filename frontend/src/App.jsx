import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ForgotPassword from "./components/ForgotPassword/forgotPassword";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/DashBoard";
import DoctorsPage from "./pages/Doctors";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
      
        <Route path="/" element={<LoginPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        
        <Route path="/home" element={<Dashboard />} />
        <Route path="/doctor" element={<DoctorsPage />} />

        {/* Forgot Password Route */}
        
        <Route path="/signup" element={<SignUpPage />} />

        
      </Routes>
    </Router>
  );
}

export default App;
