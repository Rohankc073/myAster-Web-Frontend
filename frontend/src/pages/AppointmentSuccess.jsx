import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const AppointmentSuccess = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    // Retrieve appointment details from localStorage
    const storedAppointment = JSON.parse(localStorage.getItem("appointment"));
    if (storedAppointment) {
      setAppointmentDetails(storedAppointment);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-full max-w-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-green-600">🎉 Appointment Confirmed!</h2>
          <p className="text-gray-700 mt-3">Your appointment has been successfully booked.</p>
          <p className="text-gray-600 text-sm">A confirmation email has been sent to your registered email.</p>

          {appointmentDetails ? (
            <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center">
              {/* Doctor Image */}
              {/* <img
                src={appointmentDetails.doctorImage || "/images/default-doctor.png"}
                alt={appointmentDetails.doctorName}
                className="w-24 h-24 rounded-full object-cover border shadow-md"
              /> */}

              <h3 className="text-lg font-semibold text-gray-800 mt-3 flex items-center">
                📌 Appointment Details
              </h3>

              <div className="mt-3 text-gray-700 space-y-2 text-left w-full px-6">
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Doctor">👨‍⚕️</span> 
                  <strong>Doctor:</strong> {appointmentDetails.doctorName}
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Specialization">📋</span> 
                  <strong>Specialization:</strong> {appointmentDetails.specialization}
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Calendar">📅</span> 
                  <strong>Date:</strong> {appointmentDetails.date}
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Clock">⏰</span> 
                  <strong>Time:</strong> {appointmentDetails.time}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No appointment details found.</p>
          )}

          <Link
            to="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentSuccess;
