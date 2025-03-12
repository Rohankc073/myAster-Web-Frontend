import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    servicesIncluded: "",
    image: null,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  // ✅ Fetch all packages
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5003/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    setPackageData({ ...packageData, image: e.target.files[0] });
  };

  // ✅ Handle Add & Edit Package
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", packageData.name);
    formData.append("description", packageData.description);
    formData.append("price", packageData.price);
    formData.append("duration", packageData.duration);
    formData.append("servicesIncluded", packageData.servicesIncluded);
    if (packageData.image) {
      formData.append("image", packageData.image);
    }

    try {
      if (editingPackage) {
        // Update Package
        const response = await axios.put(
          `http://localhost:5003/packages/${editingPackage._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          fetchPackages();
        }
      } else {
        // Add Package
        const response = await axios.post("http://localhost:5003/packages", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          fetchPackages();
        }
      }
      setShowModal(false);
      setEditingPackage(null);
      setPackageData({
        name: "",
        description: "",
        price: "",
        duration: "",
        servicesIncluded: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setPackageData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      servicesIncluded: pkg.servicesIncluded.join(", "),
      image: null,
    });
    setShowModal(true);
  };

  // ✅ Delete Package
  const deletePackage = async (packageId) => {
    try {
      await axios.delete(`http://localhost:5003/packages/${packageId}`);
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64">
          <AdminSidebar />
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Packages</h2>

          <button
            onClick={() => {
              setEditingPackage(null);
              setPackageData({
                name: "",
                description: "",
                price: "",
                duration: "",
                servicesIncluded: "",
                image: null,
              });
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
          >
            Add New Package
          </button>

          {loading ? (
            <p className="text-center text-gray-600">Loading packages...</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="border p-3">Package Name</th>
                    <th className="border p-3">Price (NPR)</th>
                    <th className="border p-3">Duration</th>
                    <th className="border p-3">Services Included</th>
                    <th className="border p-3">Image</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg._id} className="border hover:bg-gray-100 transition">
                      <td className="border p-3">{pkg.name}</td>
                      <td className="border p-3">NPR {pkg.price}</td>
                      <td className="border p-3">{pkg.duration} Days</td>
                      <td className="border p-3">{pkg.servicesIncluded.join(", ")}</td>
                      <td className="border p-3">
                        {pkg.image ? (
                          <img src={`http://localhost:5003/${pkg.image}`} alt={pkg.name} className="w-16 h-16 object-cover rounded-md" />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="border p-3 space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition"
                          onClick={() => handleEdit(pkg)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                          onClick={() => deletePackage(pkg._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h3 className="text-xl font-bold mb-4">{editingPackage ? "Edit Package" : "Add New Package"}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="name" placeholder="Package Name" className="w-full p-2 border rounded-lg" onChange={handleInputChange} value={packageData.name} required />
                  <textarea name="description" placeholder="Package Description" className="w-full p-2 border rounded-lg" onChange={handleInputChange} value={packageData.description} required />
                  <input type="number" name="price" placeholder="Price (NPR)" className="w-full p-2 border rounded-lg" onChange={handleInputChange} value={packageData.price} required />
                  <input type="number" name="duration" placeholder="Duration (Days)" className="w-full p-2 border rounded-lg" onChange={handleInputChange} value={packageData.duration} required />
                  <input type="text" name="servicesIncluded" placeholder="Services (comma-separated)" className="w-full p-2 border rounded-lg" onChange={handleInputChange} value={packageData.servicesIncluded} required />
                  <input type="file" accept="image/*" className="w-full p-2 border rounded-lg" onChange={handleImageChange} />

                  <div className="flex justify-between">
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Back</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      {editingPackage ? "Update Package" : "Add Package"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPackages;
