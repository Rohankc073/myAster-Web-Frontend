import React from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const LoginPage = () => {
  return (
    <> 
    < Navbar/>
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Main Section */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 mt-20">
        {/* Left Section */}
        <div className="text-center lg:text-left max-w-lg z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-snug">
            It’s important to take care of your {" "}
            <span className="text-blue-600">health</span> even if you seem
            healthy.
          </h1>
          <p className="mt-4 text-gray-600">
            Your Health App is here to assist you in managing your wellness.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700">
            Sign Up
          </button>
        </div>

        {/* Middle Section - Image */}
        <div className="relative left-0 bottom-0 w-full flex justify-center items-end lg:static lg:mt-0 lg:ml-10">
          <img
            src="/images/doc1.png"
            alt="Healthcare Professionals"
            className="w-[800px] h-auto object-contain relative top-10" // Adjust `top-10` as needed
          />
        </div>


        {/* Right Section - Form */}
        <div className="flex-grow max-w-lg bg-white shadow-lg rounded-lg p-10 z-20 lg:ml-10">
          <h2 className="text-2xl font-semibold mb-3">Log In Here</h2>
          <p className="text-gray-600 mb-6">
            View all of your reports and scheduled health exams in one location.
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
            <div className="flex justify-between text-sm text-blue-600 mb-4">
              <a href="#">Forget Password?</a>
              <a href="#">Register</a>
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
      <Footer/>
    </div>
    </>
  );
};

export default LoginPage;
