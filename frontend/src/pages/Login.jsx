import React from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar"; // Import the Navbar component

const LoginPage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="bg-gray-50 min-h-screen flex flex-col items-center pt-20">
        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 lg:px-12">
          {/* Left Section */}
          <div className="text-center lg:text-left max-w-lg lg:mr-16">
            <h1 className="text-5xl font-bold leading-snug text-gray-900">
              It’s important to take care of your{" "}
              <span className="text-blue-600">health</span> even if you seem
              healthy.
            </h1>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center items-center mt-12 lg:mt-0 w-full">
  <img
    src="/images/doc1.png" // Replace with your actual image path
    alt="Doctors"
    className="w-full max-w-4xl lg:max-w-5xl object-contain" // Scale and center the image
  />
</div>

          {/* Right Section (Login Card) */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md lg:ml-16 mt-12 lg:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Log In Here</h2>
            <p className="text-gray-600 mb-6">
              View all of your reports and scheduled health exams in one
              location.
            </p>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Mobile / Email ID"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-between text-sm text-blue-600 mb-6">
                <a href="#" className="hover:underline">
                  Forget Password?
                </a>
                <a href="#" className="hover:underline">
                  Register
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      < Footer />
    </>
  );
};

export default LoginPage;
