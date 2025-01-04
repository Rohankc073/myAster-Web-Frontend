import React, { useState } from "react";
import DoctorListComponent from "../components/DocList/doclist";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const DoctorsPage = () => {
  // Dummy data for doctors
  const doctors = [
    {
      id: 1,
      name: "Prof. Dr. Nityeshwar T K",
      designation: "Chairman - Medical Advisory Board of Damai Tar, Lalitpur",
      qualifications: "MBBS, MS, MCh(Onco), FRCS Edinburgh",
      description:
        "An accomplished super speciality consultant in Surgical Oncology.",
      hospital: "Aster CMI Bangalore, Aster Whitefield Bangalore",
      speciality: "Surgical Oncology",
      image: "/images/Doctor1.jpeg",
    },
    {
      id: 2,
      name: "Dr. P Ranganadham",
      designation: "HOD & Senior Consultant – Neuro Surgery",
      qualifications: "MBBS, MCh Neuro Surgery (AIIMS,Delhi)",
      description: "Renowned neurosurgeon with over four decades of expertise.",
      hospital: "Aster Prime Hyderabad",
      speciality: "Neuro Surgery",
      image: "/images/doctor2.png",
    },
    {
      id: 3,
      name: "Dr. Vijay K Ahuja",
      designation: "Senior Consultant – Cardiology",
      qualifications: "MBBS, MD, DM (Cardiology)",
      description:
        "Specializes in managing complex cardiac cases with a focus on patient care.",
      hospital: "Aster RV Hospital, Bangalore",
      speciality: "Cardiology",
      image: "/images/doctor3.png",
    },
  ];

  // Specialities available in the data
  const specialities = ["Surgical Oncology", "Neuro Surgery", "Cardiology"];

  // State for selected speciality filter
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  // Filtered doctors based on the selected speciality
  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doctor) => doctor.speciality === selectedSpeciality)
    : doctors;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter Section */}
          <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Filters</h2>
            <div>
              <h3 className="text-gray-600 font-medium mb-2">Speciality</h3>
              <ul className="space-y-2">
                {specialities.map((speciality, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`speciality-${index}`}
                      name="speciality"
                      value={speciality}
                      className="w-4 h-4"
                      onChange={(e) => setSelectedSpeciality(e.target.value)}
                    />
                    <label
                      htmlFor={`speciality-${index}`}
                      className="text-gray-600 cursor-pointer"
                    >
                      {speciality}
                    </label>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 text-sm text-blue-600 hover:underline"
                onClick={() => setSelectedSpeciality("")}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Doctors List Section */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorListComponent key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <p className="text-gray-600">No doctors available for the selected speciality.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorsPage;
