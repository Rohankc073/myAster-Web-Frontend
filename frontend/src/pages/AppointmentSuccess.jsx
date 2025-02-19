import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const AppointmentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-green-600">🎉 Appointment Confirmed!</h2>
          <p className="text-gray-700 mt-4">Your appointment has been successfully booked.</p>
          <p className="text-gray-700">A confirmation email has been sent to your registered email.</p>

          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentSuccess;
