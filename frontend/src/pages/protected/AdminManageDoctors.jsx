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
    contact: "",
    email: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  // Fetch Doctors from API
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5003/doctors/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setNewDoctor({ ...newDoctor, image: e.target.files[0] });
  };

  // Open Modal
  const openModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setNewDoctor({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        contact: doctor.contact || "",
        email: doctor.email || "",
        image: null,
      });
    } else {
      setEditingDoctor(null);
      setNewDoctor({
        name: "",
        specialization: "",
        contact: "",
        email: "",
        image: null,
      });
    }
    setShowModal(true);
  };

  // Submit Doctor Data
  const handleSubmit = async () => {
    try {
      if (!newDoctor.name || !newDoctor.specialization || !newDoctor.contact || !newDoctor.email) {
        alert("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", newDoctor.name);
      formData.append("specialization", newDoctor.specialization);
      formData.append("contact", newDoctor.contact);
      formData.append("email", newDoctor.email);
      if (newDoctor.image) {
        formData.append("image", newDoctor.image);
      }

      if (editingDoctor) {
        await axios.put(`http://localhost:5003/doctors/${editingDoctor._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5003/doctors/save", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error.response ? error.response.data : error);
    }
  };

  // Delete Doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await axios.delete(`http://localhost:5003/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUserMd className="mr-2" /> Manage Doctors
        </h1>

        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add Doctor
        </button>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Specialization</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Contact</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
              <h2 className="text-xl font-bold mb-4">{editingDoctor ? "Edit Doctor" : "Add Doctor"}</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={newDoctor.specialization}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={newDoctor.contact}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newDoctor.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Image</label>
                  <input type="file" onChange={handleImageChange} className="w-full" />
                </div>
              </form>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageDoctors;
