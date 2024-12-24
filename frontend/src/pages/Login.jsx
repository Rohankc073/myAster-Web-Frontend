import React from "react";
import Navbar from "../components/navbar"; // Import the Navbar component
import "../styles/login.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Use Navbar Component */}
      <Navbar />

      <div className="content">
        <div className="left-section">
          <h1>It’s important to take care of your <span>health</span> even if you seem healthy.</h1>
          <button className="signup-btn">Sign Up</button>
        </div>

        <div className="right-section">
          <div className="login-card">
            <h2>Log In Here</h2>
            <p>View all of your reports and scheduled health exams in one location.</p>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Mobile / Email ID" required />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="form-footer">
                <a href="#">Forget Password?</a>
                <a href="#">Register</a>
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
