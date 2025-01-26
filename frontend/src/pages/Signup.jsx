import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { registerUser } from "../apis/api"; // Import registerUser function
import Navbar from "../components/Navbar/navbar";

// Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required").min(3, "Full Name must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data); // Use registerUser API function
      if (response.status === 200) {
        alert("Sign up successful!");
        reset(); // Clear form after successful signup
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white-50 min-h-screen flex flex-col relative">
        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto px-20 mt-1px lg:mt-32 z-10">
          
          {/* Left Section */}
          <div className="text-center lg:text-left max-w-lg z-20 lg:pr-32 lg:w-1/2 lg:ml-[-10px] lg:mt-[-80px]">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
              It’s important to take care of your{" "}
              <span className="text-blue-600">health</span> even if you seem healthy.
            </h1>
            <p className="mt-4 text-gray-600">Your Health App.</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700">
              Login In
            </button>
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

              <div className="mb-4">
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
              </div>

              <div className="flex justify-between text-sm text-blue-600 mb-4">
                <span>Already have an account?</span>
                <a href="#">Log In</a>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg font-medium hover:bg-blue-700">
                Sign Up
              </button>
            </form>

            {/* Sign Up with Google Button */}
            <div className="mt-4 flex justify-center">
              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-gray-600 hover:text-gray-800"
              >
                <img src="/images/googlelogo.png" alt="Google Icon" className="w-5 h-5" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>

        {/* Background & Doctor Image */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-100 to-transparent z-1"></div>
        <div className="absolute bottom-0 w-full flex justify-start">
          <img src="/images/doc1.png" alt="Healthcare Professionals" className="w-[760px] max-w-full object-contain translate-x-[200px]" />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
