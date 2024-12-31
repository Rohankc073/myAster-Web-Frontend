import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ForgotPassword from "./components/ForgotPassword/forgotPassword";
import ForgotPassword from "./pages/ForgotPassword";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
