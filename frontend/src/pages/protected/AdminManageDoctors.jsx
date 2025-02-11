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
    availableDays: [],
    availableTimes: [],
    contact: "",
    email: "",
    image: null, // Image file
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

    if (name === "availableDays") {
      setNewDoctor({ ...newDoctor, availableDays: value.split(",").map((date) => date.trim()) });
    } else if (name === "availableTimes") {
      setNewDoctor({
        ...newDoctor,
        availableTimes: value.split(",").map((time) => {
          const [startTime, endTime] = time.trim().split("-");
          return { startTime: startTime.trim(), endTime: endTime.trim() };
        }),
      });
    } else {
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    setNewDoctor({ ...newDoctor, image: e.target.files[0] });
  };

  // ✅ Open Add/Edit Modal
  const openModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setNewDoctor({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        availableDays: doctor.availableDays || [],
        availableTimes: doctor.availableTimes || [],
        contact: doctor.contact || "",
        email: doctor.email || "",
        image: doctor.image || null,
      });
    } else {
      setEditingDoctor(null);
      setNewDoctor({
        name: "",
        specialization: "",
        availableDays: [],
        availableTimes: [],
        contact: "",
        email: "",
        image: null,
      });
    }
    setShowModal(true);
  };

  // ✅ Submit New or Updated Doctor
  const handleSubmit = async () => {
    try {
      if (!newDoctor.name || !newDoctor.specialization || !newDoctor.email || !newDoctor.contact) {
        alert("⚠️ Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", newDoctor.name);
      formData.append("specialization", newDoctor.specialization);
      formData.append("contact", newDoctor.contact);
      formData.append("email", newDoctor.email);
      formData.append("availableDays", JSON.stringify(newDoctor.availableDays));
      formData.append("availableTimes", JSON.stringify(newDoctor.availableTimes));
      
      if (newDoctor.image && typeof newDoctor.image !== "string") {
        formData.append("image", newDoctor.image);
      }

      let response;
      if (editingDoctor) {
        response = await axios.put(`http://localhost:5003/doctors/${editingDoctor._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        setDoctors((prevDoctors) =>
          prevDoctors.map((doc) => (doc._id === editingDoctor._id ? response.data.updatedDoctor : doc))
        );
      } else {
        response = await axios.post("http://localhost:5003/doctors/save", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        setDoctors((prevDoctors) => [...prevDoctors, response.data.newDoctor]);
      }

      setShowModal(false);
      fetchDoctors(); // Refresh list after update
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
      fetchDoctors(); // Refresh list after delete
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
                <th className="border p-3">Image</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">
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
                    <td className="p-3">{doctor.availableDays?.join(", ") || "N/A"}</td>
                    <td className="p-3">{doctor.availableTimes?.map(t => `${t.startTime} - ${t.endTime}`).join(", ") || "N/A"}</td>
                    <td className="p-3">
                      {doctor.image && (
                        <img src={`http://localhost:5003/${doctor.image}`} alt={doctor.name} className="w-16 h-16 rounded" />
                      )}
                    </td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button onClick={() => openModal(doctor)} className="text-yellow-600 hover:text-yellow-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(doctor._id)} className="text-red-600 hover:text-red-800">
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
    </div>
  );
};

export default AdminManageDoctors;
