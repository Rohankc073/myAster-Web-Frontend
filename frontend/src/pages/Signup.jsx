import React from "react";
import Navbar from "../components/Navbar/navbar";

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white-50 min-h-screen flex flex-col relative">
        {/* Main Section */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto px-20 mt-1px lg:mt-32 z-10">
          {/* Left Section */}
          <div className="text-center lg:text-left max-w-lg z-20 lg:pr-32 lg:w-1/2 lg:ml-[-10px] lg:mt-[-80px]"> {/* Shifted up */}
            <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
              It’s important to take care of your{" "}
              <span className="text-blue-600">health</span> even if you seem healthy.
            </h1>
            <p className="mt-4 text-gray-600">
              Your Health App.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700">
              Login In
            </button>
          </div>


          {/* Right Section - Form */}
          <div className="max-w-lg bg-white shadow-lg rounded-lg p-5 z-20 lg:ml-[435px] lg:w-[45%]"> {/* Increased max width */}
            <h2 className="text-2xl font-semibold mb-3">Sign Up Here</h2>
            <p className="text-gray-600 mb-6">
              View all of your reports and scheduled health exams in one location.
            </p>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="phone_number"
                  placeholder="Phone No. "
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
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-between text-sm text-blue-600 mb-4">
                <span>Already have an account?</span>
                <a href="#">Log In</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg font-medium hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>

            {/* Sign Up with Google Button */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-gray-600 hover:text-gray-800"
              >
                <img
                  src="/images/googlelogo.png" /* Make sure to have a Google icon */
                  alt="Google Icon"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-100 to-transparent z-1"></div>

        {/* Doctor Image */}
        <div className="absolute bottom-0 w-full flex justify-start"> {/* Shifted image further to the right */}
          <img
            src="/images/doc1.png"
            alt="Healthcare Professionals"
            className="w-[760px] max-w-full object-contain translate-x-[200px]" // Adjusted position
          />
        </div>



      </div>

    </>
  );
};

export default SignUpPage;
