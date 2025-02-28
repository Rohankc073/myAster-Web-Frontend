import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    problemDescription: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (err) {
        setError("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "age") value = value < 0 ? 0 : value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to book an appointment.");
      return;
    }
  
    const appointmentData = {
      userId: user._id,
      doctorId,
      doctorName: doctor?.name,
      specialization: doctor?.specialization,
      age: formData.age,
      gender: formData.gender,
      problemDescription: formData.problemDescription,
      date: formData.date,
      time: formData.time,
    };
    try {
      await axios.post("http://localhost:5003/appointments/schedule", appointmentData);
      localStorage.setItem("appointment", JSON.stringify(appointmentData));
      navigate("/appointment-success"); // ✅ Redirect after successful booking
    } catch (err) {
      alert("Error booking appointment. Please try again.");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-8 mt-20 flex justify-center">
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex">
          {/* ✅ Left Section - Bigger Doctor Info */}
          <div className="w-1/3 bg-gray-100 p-6 rounded-l-lg text-center flex flex-col items-center">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <>
                <img
                  src={doctor?.image ? `http://localhost:5003/${doctor.image}` : "/images/default-doctor.png"}
                  alt={doctor?.name || "Doctor"}
                  className="w-40 h-40 rounded-full object-cover border shadow-lg" // ✅ Increased Size
                />
                <h2 className="text-2xl font-bold text-gray-800 mt-3">{doctor?.name}</h2>
                <p className="text-gray-600 font-semibold">{doctor?.specialization}</p>
                <p className="text-gray-600">📧 {doctor?.email}</p>
                <p className="text-gray-600">📞 {doctor?.contact}</p>
              </>
            )}
          </div>

          {/* ✅ Right Section - User & Form */}
          <div className="w-2/3 p-8">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">Your Details</h3>
              <p><strong>Name:</strong> {user?.name || "Not Available"}</p>
              <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
            </div>

            {/* ✅ Appointment Form */}
            <h3 className="text-xl font-semibold mb-4">Book Your Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name (Auto-Filled & Read-Only) */}
              <div>
                <label className="block text-gray-700 font-medium">Patient Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-100"
                />
              </div>

              <div>
  <label className="block text-gray-700 font-medium">Select Age</label>
  <select
    name="age"
    value={formData.age}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-lg py-2 px-4 cursor-pointer"
  >
    <option value="">Select Age</option>
    {[...Array(100).keys()].map((num) => (
      <option key={num + 1} value={num + 1}>
        {num + 1} years
      </option>
    ))}
  </select>
</div>

              {/* Gender Selection */}
              <div>
                <label className="block text-gray-700 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg py-2 px-4"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-gray-700 font-medium">Problem Description</label>
                <textarea
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 h-20"
                  placeholder="Briefly describe your health issue..."
                />
              </div>

              {/* Date Selection (Restricts Past Dates) */}
              <div>
                <label className="block text-gray-700 font-medium">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 cursor-pointer"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-gray-700 font-medium">Select Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 cursor-pointer"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointmentPage;
