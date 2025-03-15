import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
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
  const [viewMode, setViewMode] = useState("grid");

  // ✅ Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5003/doctors/getAll");
        setDoctors(response.data);

        // Extract unique specialities dynamically
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

  // ✅ Optimized Filtering with useMemo()
  const filteredDoctors = useMemo(() => {
    return selectedSpeciality
      ? doctors.filter((doctor) => doctor.specialization === selectedSpeciality)
      : doctors;
  }, [selectedSpeciality, doctors]);

  return (
    <>
      <Navbar />
      <Carousel />

      {/* ✅ Fixes Scroll Delay & Ensures Full Height */}
      <div className="bg-gray-50 flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            
            {/* 🔹 Filter Section - Shifted More to Left */}
            <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6 w-full max-w-[280px]">
              <h2 className="text-lg font-bold text-gray-700 mb-4">Filters</h2>
              <div>
                <h3 className="text-gray-600 font-medium mb-2 flex items-center">
                  <FiFilter className="mr-2" /> Speciality
                </h3>
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

            {/* 🔹 Doctors List Section */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Available Doctors</h2>
                
                {/* Grid & List View Toggle Buttons */}
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setViewMode("grid")} 
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-600"}`}
                  >
                    <FiGrid size={20} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")} 
                    className={`p-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-600"}`}
                  >
                    <FiList size={20} />
                  </button>
                </div>
              </div>

              {loading ? (
                <p className="text-gray-600">Loading doctors...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
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
      </div>

      {/* ✅ Footer Now Always at Bottom */}
      <Footer />
    </>
  );
};

export default DoctorsPage;
