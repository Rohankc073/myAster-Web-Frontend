import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCapsules, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    genericName: "",
    manufacturer: "",
    price: "",
    quantity: "",
    dosage: "",
    requiresPrescription: false,
    category: "",
    image: null,
    description: "",
  });

  const token = localStorage.getItem("token");

  // Fetch Medicines
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5003/products/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setError("Failed to load products.");
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Open Add/Edit Modal
  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setNewProduct({
        ...product,
        image: null, // Reset image field to allow file selection
      });
    } else {
      setEditingProduct(null);
      setNewProduct({
        name: "",
        genericName: "",
        manufacturer: "",
        price: "",
        quantity: "",
        dosage: "",
        requiresPrescription: false,
        category: "",
        image: null,
        description: "",
      });
    }
    setShowModal(true);
  };

  // Submit New or Updated Medicine
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (editingProduct) {
        await axios.put(`http://localhost:5003/products/update/${editingProduct._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Medicine updated successfully!");
      } else {
        await axios.post("http://localhost:5003/products/add", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Medicine added successfully!");
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("❌ Error saving medicine:", error);
      toast.error("Failed to save medicine.");
    }
  };

  // Handle Delete Product API Call
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5003/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaCapsules className="mr-2" /> Manage Medicines
        </h1>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Add Medicine Button */}
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-700 transition"
        >
          + Add Medicine
        </button>

        {/* Medicines Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Generic Name</th>
                <th className="border p-3">Manufacturer</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="border hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.genericName}</td>
                  <td className="p-3">{product.manufacturer}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button onClick={() => openModal(product)} className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Medicine Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Medicine" : "Add Medicine"}</h2>

              <input type="text" name="name" placeholder="Medicine Name" className="w-full border p-2 mb-2" onChange={handleInputChange} value={newProduct.name} />
              <input type="text" name="genericName" placeholder="Generic Name" className="w-full border p-2 mb-2" onChange={handleInputChange} value={newProduct.genericName} />
              <input type="text" name="manufacturer" placeholder="Manufacturer" className="w-full border p-2 mb-2" onChange={handleInputChange} value={newProduct.manufacturer} />
              <input type="number" name="price" placeholder="Price" className="w-full border p-2 mb-2" onChange={handleInputChange} value={newProduct.price} />
              <input type="number" name="quantity" placeholder="Quantity" className="w-full border p-2 mb-2" onChange={handleInputChange} value={newProduct.quantity} />
              <input type="file" name="image" className="w-full border p-2 mb-2" onChange={handleImageChange} />
              <textarea name="description" placeholder="Description" className="w-full border p-2 mb-2" onChange={handleInputChange} value={newProduct.description} />

              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageProducts;
