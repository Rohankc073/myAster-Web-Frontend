import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../apis/api";
import Navbar from "../components/Navbar/navbar";

// ✅ Import Icons
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate(); 

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  // ✅ Check if User is Already Logged In on Load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      if (user.role === "Admin") {
        navigate("/admin"); 
      } else {
        navigate("/home"); 
      }
    }
  }, [navigate]);

  // ✅ Handle login form submission
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        if (response.user.role === "Admin") {
          toast.success("Welcome Admin!", { position: "top-right" });
        } else {
          toast.success("Login successful!", { position: "top-right" });
        }

        setTimeout(() => {
          if (response.user.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }, 1000);
      } else {
        throw new Error("Token not received!");
      }
    } catch (error) {
      console.error("❌ Login Failed:", error);
      toast.error("Login failed! Please check your credentials.", { position: "top-right" });
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} /> 
      
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
            <p className="mt-4 text-gray-600">Your Health App.</p>
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
              {/* Email Field with Icon */}
              <div className="mb-4 relative">
                <FaEnvelope className="absolute left-3 top-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Password Field with Icon & Eye Toggle */}
              <div className="mb-4 relative">
                <FaLock className="absolute left-3 top-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {/* Eye Button */}
                <button
  type="button"
  aria-label="toggle password visibility"
  className="absolute right-3 top-4 text-gray-500 focus:outline-none"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>
              </div>

              <div className="flex justify-between text-sm text-blue-600 mb-4">
                <a href="/forgot-password">Forget Password?</a>
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

        {/* ✅ Matched Background Gradient with Signup Page */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-200 to-transparent z-[-1]"></div>

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
