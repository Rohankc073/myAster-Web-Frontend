import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { loginUser } from "../apis/api";
import Navbar from "../components/Navbar/navbar";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login form submission
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log("🎉 Login Successful:", response);

      if (response.token) {
        // Save token in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user)); // Store user info (optional)

        alert("Login successful! Redirecting...");
        navigate("/home"); // Redirect to Dashboard
      } else {
        throw new Error("Token not received!");
      }
    } catch (error) {
      console.error("❌ Login Failed:", error);
      alert("Login failed! Please check your credentials.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-white-50 min-h-screen flex flex-col relative">
        {/* Main Section */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto px-20 mt-20 lg:mt-32 z-10">
          {/* Left Section */}
          <div className="text-center lg:text-left max-w-lg z-20 lg:pr-32 lg:w-1/2 lg:ml-[-50px]">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
              It’s important to take care of your{" "}
              <span className="text-blue-600">health</span> even if you seem
              healthy.
            </h1>
            <p className="mt-4 text-gray-600">
              Your Health App.
            </p>
            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700"
              onClick={() => navigate("/signup")}
            >
              Sign Up for Free
            </button>
          </div>

          {/* Right Section - Form */}
          <div className="max-w-lg bg-white shadow-lg rounded-lg p-5 z-20 lg:ml-[435px] lg:w-[45%]">
            <h2 className="text-2xl font-semibold mb-3">Log In Here</h2>
            <p className="text-gray-600 mb-6">
              View all of your reports and scheduled health exams in one location.
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Mobile / Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-between text-sm text-blue-600 mb-4">
                <a href="#">Forget Password?</a>
                <a href="/signup">Register</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg font-medium hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-100 to-transparent z-1"></div>

        {/* Doctor Image */}
        <div className="absolute bottom-0 w-full flex justify-center">
          <img
            src="/images/doc1.png"
            alt="Healthcare Professionals"
            className="w-[760px] max-w-full object-contain translate-x-[-80px]" 
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
