import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUserMd } from "react-icons/fa";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    availableDays: "",
    availableTimes: "",
    contact: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch Doctors from API
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5003/doctors/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("❌ Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ Handle Input Change for Add/Edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  // ✅ Open Add/Edit Modal
  const openModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setNewDoctor({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        availableDays: doctor.availableDays ? doctor.availableDays.join(", ") : "",
        availableTimes: doctor.availableTimes ? doctor.availableTimes.join(", ") : "",
        contact: doctor.contact || "",
        email: doctor.email || "",
      });
    } else {
      setEditingDoctor(null);
      setNewDoctor({
        name: "",
        specialization: "",
        availableDays: "",
        availableTimes: "",
        contact: "",
        email: "",
      });
    }
    setShowModal(true);
  };

  // ✅ Submit New or Updated Doctor
  const handleSubmit = async () => {
    try {
      const doctorData = {
        ...newDoctor,
        availableDays: newDoctor.availableDays.split(",").map(day => day.trim()),
        availableTimes: newDoctor.availableTimes.split(",").map(time => time.trim()),
      };

      if (!doctorData.name || !doctorData.specialization || !doctorData.email || !doctorData.contact) {
        alert("⚠️ Please fill in all required fields.");
        return;
      }

      let response;
      if (editingDoctor) {
        // ✅ Update Doctor
        response = await axios.put(
          `http://localhost:5003/doctors/${editingDoctor._id}`,
          doctorData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update UI immediately
        setDoctors((prevDoctors) =>
          prevDoctors.map((doc) => (doc._id === editingDoctor._id ? response.data.updatedDoctor : doc))
        );
      } else {
        // ✅ Add New Doctor
        response = await axios.post("http://localhost:5003/doctors/save", doctorData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Update UI immediately
        setDoctors((prevDoctors) => [...prevDoctors, response.data.newDoctor]);
      }

      setShowModal(false);
    } catch (error) {
      console.error("❌ Error saving doctor:", error.response ? error.response.data : error);
      alert("⚠️ Error: " + (error.response?.data?.error || "Something went wrong."));
    }
  };

  // ✅ Delete Doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await axios.delete(`http://localhost:5003/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error("❌ Error deleting doctor:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUserMd className="mr-2" /> Manage Doctors
        </h1>

        {/* Add Doctor Button */}
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add Doctor
        </button>

        {/* Doctors Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Specialization</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Contact</th>
                <th className="border p-3">Available Days</th>
                <th className="border p-3">Available Times</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    Loading doctors...
                  </td>
                </tr>
              ) : (
                doctors.map((doctor, index) => (
                  <tr key={doctor._id} className="border hover:bg-gray-50 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{doctor.name}</td>
                    <td className="p-3">{doctor.specialization}</td>
                    <td className="p-3">{doctor.email}</td>
                    <td className="p-3">{doctor.contact}</td>
                    <td className="p-3">{doctor.availableDays.join(", ")}</td>
                    <td className="p-3">{doctor.availableTimes.join(", ")}</td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button
                        onClick={() => openModal(doctor)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Doctor Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingDoctor ? "Edit Doctor" : "Add Doctor"}</h2>

            {Object.keys(newDoctor).map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="w-full border p-2 mb-2"
                onChange={handleInputChange}
                value={newDoctor[field]}
              />
            ))}

            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageDoctors;
