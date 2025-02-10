import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5003/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      setError("Failed to fetch users.");
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Edit Button Click
  const handleEditClick = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  // Handle Update User API Call
  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:5003/user/update/${editUser._id}`,
        { name: editUser.name, email: editUser.email, role: editUser.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User updated successfully!");
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("❌ Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  // Handle Delete Button Click (Open Modal)
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Handle Delete User API Call
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5003/user/${userToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User deleted successfully!");
      setShowDeleteModal(false);
      fetchUsers();
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUsers className="mr-2" /> Manage Users
        </h1>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Loading & Error Messages */}
        {loading && <p className="text-center text-lg text-blue-600">Loading users...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Users Table */}
        {users?.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Role</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="border hover:bg-gray-50 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-yellow-600 hover:text-yellow-800 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}

        {/* Edit User Modal */}
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>

              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                className="w-full border px-3 py-2 rounded-md mb-4"
              />

              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className="w-full border px-3 py-2 rounded-md mb-4"
              />

              <label className="block mb-2">Role</label>
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                className="w-full border px-3 py-2 rounded-md mb-4"
              >
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
              <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>

              <div className="flex justify-center mt-4 space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminManageUsers;
