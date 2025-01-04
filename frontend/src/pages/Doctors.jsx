import React from "react";
import DoctorListComponent from "../components/DocList/doclist";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const DoctorsPage = () => {
  // Dummy data for doctors
  const doctors = [
    {
      id: 1,
      name: "Prof. Dr. Somashekhar S P",
      designation: "Chairman - Medical Advisory Board",
      qualifications: "MBBS, MS, MCh(Onco), FRCS Edinburgh",
      description:
        "An accomplished super speciality consultant in Surgical Oncology.",
      hospital: "Aster CMI Bangalore, Aster Whitefield Bangalore",
      speciality: "Surgical Oncology",
      image: "/images/doctor1.png",
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

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen p-8">
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Doctors</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {doctors.map((doctor) => (
          <DoctorListComponent key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default DoctorsPage;
