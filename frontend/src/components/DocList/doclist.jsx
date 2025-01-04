import React from "react";

const DoctorListComponent = ({ doctor }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-6 bg-white shadow-md rounded-lg mb-6">
      <img
        src={doctor.image || "/images/default-doctor.png"}
        alt={doctor.name}
        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mr-6"
      />
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-bold text-green-700">
          {doctor.name}
        </h3>
        <p className="text-gray-600 mb-2">{doctor.designation}</p>
        <p className="text-gray-600 text-sm mb-4">{doctor.qualifications}</p>
        <p className="text-gray-700 text-sm mb-4">{doctor.description}</p>
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-sm text-gray-500">
              <span className="font-bold text-gray-700">HOSPITAL:</span>{" "}
              {doctor.hospital}
            </p>
            <p className="font-medium text-sm text-gray-500">
              <span className="font-bold text-gray-700">SPECIALITY:</span>{" "}
              {doctor.speciality}
            </p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorListComponent;
