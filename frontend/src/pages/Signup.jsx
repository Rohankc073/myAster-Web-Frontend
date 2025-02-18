import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import Toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Toast Styles
import * as yup from "yup";
import { registerUser } from "../apis/api"; // Import API function
import Navbar from "../components/Navbar/navbar";

// Validation Schema (No confirmPassword)
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required").min(3, "Full Name must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("📤 Form Submitted, Data:", data);
    setLoading(true);

    const userData = {
      name: data.fullName, 
      email: data.email,
      password: data.password,
      phone: data.phoneNumber,
      role: "Patient",
    };

    try {
      console.log("📨 Sending API Request...");
      const response = await registerUser(userData);
      console.log("✅ API Response:", response);

      if (response?.user) {
        toast.success("Sign up successful! Redirecting... 🎉"); // ✅ Success Toast
        reset(); // ✅ Clear Form

        // ✅ Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        toast.error("Signup failed. Please try again."); // ❌ Error Toast
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again."); // ❌ Error Toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Toast Container */}

      <div className="bg-white-50 min-h-screen flex flex-col relative">
        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto px-20 mt-1px lg:mt-32 z-10">
          
        {/* Left Section */}
<div className="text-center lg:text-left max-w-lg z-20 lg:pr-32 lg:w-1/2 lg:ml-[-10px] lg:mt-[-80px]">
  <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
    It’s important to take care of your{" "}
    <span className="text-blue-600">health</span> even if you seem healthy.
  </h1>
  <p className="mt-4 text-gray-600">Your Health App.</p>
  <a 
  href="/login" 
  className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700"
>
  Log In
</a>
</div>


          {/* Right Section - Form */}
          <div className="max-w-lg bg-white shadow-lg rounded-lg p-5 z-20 lg:ml-[435px] lg:w-[45%]">
            <h2 className="text-2xl font-semibold mb-3">Sign Up Here</h2>
            <p className="text-gray-600 mb-6">
              View all of your reports and scheduled health exams in one location.
            </p>
            
            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
              </div>

              <div className="mb-4">
                <input 
                  type="email" 
                  placeholder="Email"
                  {...register("email")}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              </div>

              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Phone No."
                  {...register("phoneNumber")}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber?.message}</p>
              </div>

              <div className="mb-4">
                <input 
                  type="password" 
                  placeholder="Password"
                  {...register("password")}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              </div>

              <div className="flex justify-between text-sm text-blue-600 mb-4">
                <span>Already have an account?</span>
                <a href="/login">Log In</a>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg font-medium hover:bg-blue-700">
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-200 to-transparent z-[-1]"></div>

        {/* Fixed Image */}
        <div className="absolute bottom-0 w-full flex justify-start">
          <img src="/images/doc1.png" alt="Healthcare Professionals" className="w-[760px] max-w-full object-contain translate-x-[200px]" />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
