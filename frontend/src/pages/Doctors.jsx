import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import DoctorListComponent from "../components/DocList/doclist";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [specialities, setSpecialities] = useState([]);

  // ✅ Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5003/doctors/getAll");
        setDoctors(response.data);
        
        // Extract unique specialities from doctors
        const uniqueSpecialities = [...new Set(response.data.map(doc => doc.specialization))];
        setSpecialities(uniqueSpecialities);
        
      } catch (err) {
        setError("Failed to load doctors. Please try again.");
        console.error("❌ Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Filtered doctors based on selected speciality
  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doctor) => doctor.specialization === selectedSpeciality)
    : doctors;

  return (
    <>
      <Navbar />
      <Carousel />
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
            {loading ? (
              <p className="text-gray-600">Loading doctors...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <DoctorListComponent key={doctor._id} doctor={doctor} />
                  ))
                ) : (
                  <p className="text-gray-600">
                    No doctors available for the selected speciality.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorsPage;
