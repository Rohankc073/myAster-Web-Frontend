import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const DoctorListComponent = ({ doctor }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-6 bg-white shadow-md rounded-lg mb-6">
      {/* Doctor Image - Ensure correct backend path */}
      <img
        src={doctor.image || "/images/default-doctor.png"}
        alt={doctor.name}
        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mr-6"
      />

      {/* Doctor Details */}
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-bold text-blue-700">
          {doctor.name}
        </h3>
        <p className="text-gray-600 mb-2"><strong>Specialization:</strong> {doctor.specialization || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> {doctor.email || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Contact:</strong> {doctor.contact || "N/A"}</p>

        {/* Hospital & Speciality */}
        <div className="flex justify-between items-center mt-4">
          <div></div>

          {/* Book Appointment Button */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate(`/book-appointment/${doctor._id}`)}
          >
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorListComponent;
