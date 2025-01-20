// src/pages/AdminManageDoctors.jsx
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUserMd } from "react-icons/fa";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminManageDoctors = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", email: "john@example.com", phone: "9876543210" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Neurologist", email: "jane@example.com", phone: "9876543211" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", email: "", phone: "" });

  const handleDelete = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor(doctor);
    setShowModal(true);
  };

  const handleAddOrUpdate = () => {
    if (editingDoctor) {
      setDoctors(doctors.map((doc) => (doc.id === editingDoctor.id ? newDoctor : doc)));
    } else {
      setDoctors([...doctors, { ...newDoctor, id: doctors.length + 1 }]);
    }
    setShowModal(false);
    setEditingDoctor(null);
    setNewDoctor({ name: "", specialty: "", email: "", phone: "" });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Content Area with Margin */}
      <div className="flex-1 p-6 ml-64"> {/* Add margin-left for sidebar */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUserMd className="mr-2" /> Manage Doctors
        </h1>

        {/* Add Doctor Button */}
        <button
          onClick={() => { setEditingDoctor(null); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add Doctor
        </button>

        {/* Doctors Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Specialty</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border text-center">
                  <td className="p-3">{doctor.id}</td>
                  <td className="p-3">{doctor.name}</td>
                  <td className="p-3">{doctor.specialty}</td>
                  <td className="p-3">{doctor.email}</td>
                  <td className="p-3">{doctor.phone}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Doctor Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">{editingDoctor ? "Edit Doctor" : "Add Doctor"}</h2>
              <input
                type="text"
                placeholder="Doctor Name"
                className="w-full border p-2 mb-2"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Specialty"
                className="w-full border p-2 mb-2"
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mb-2"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full border p-2 mb-2"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
              />

              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button onClick={handleAddOrUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editingDoctor ? "Update" : "Add"}
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
