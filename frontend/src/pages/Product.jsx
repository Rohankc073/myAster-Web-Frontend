import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FaMedkit, FaPrescription } from "react-icons/fa";
import { FiFilter, FiGrid, FiHeart, FiList, FiSearch, FiShoppingCart } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

// Manufacturers remain static
const manufacturers = ["All", "HealthCare Pharma", "MediCorp", "NaturalLife"];

const MedicineProductList = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);  // State to store the fetched products
  const [loading, setLoading] = useState(true);    // State for loading indicator
  const [categories, setCategories] = useState(["All"]);  // Dynamic categories; start with "All"

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5003/category/");
        if (response.data.success) {
          // Map over the categories and extract the name, then add "All" as the first option.
          setCategories(["All", ...response.data.categories.map((category) => category.name)]);
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5003/products/all");
        console.log("Fetched products from API:", response.data); // ✅ Debugging
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search, category, manufacturer, price range, and prescription-only filter
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.genericName.toLowerCase().includes(searchQuery.toLowerCase());
      // Here product.category is an object when populated, so we use product.category?.name
      const matchesCategory = selectedCategory === "All" || product.category?.name === selectedCategory;
      const matchesManufacturer = selectedManufacturer === "All" || product.manufacturer === selectedManufacturer;
      const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesPrescription = !showPrescriptionOnly || product.requiresPrescription;

      return matchesSearch && matchesCategory && matchesManufacturer && matchesPriceRange && matchesPrescription;
    });
  }, [searchQuery, selectedCategory, selectedManufacturer, priceRange, showPrescriptionOnly, products]);

  // Add product to cart
  const handleAddToCart = async (product) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        toast.error("User not logged in. Please log in first!", { position: "top-right" });
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id;

      if (!userId) {
        toast.error("User ID is missing. Please log in again.", { position: "top-right" });
        return;
      }

      const productId = product._id || product.id;

      console.log("Adding to cart:", { userId, productId });

      const response = await axios.post("http://localhost:5003/cart/add", {
        userId,
        productId,
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Product added to cart successfully!", { position: "top-right" });
      } else {
        toast.error("Failed to add product to cart.", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Something went wrong. Please try again.", { position: "top-right" });
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
      <img 
        src={product.image ? product.image : "/images/default-medicine.png"} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading="lazy"
      />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.genericName}</p>
        <p className="text-sm text-gray-600">{product.manufacturer}</p>
        <p className="text-sm text-gray-600">Category: {product.category?.name || "Uncategorized"}</p> {/* ✅ FIXED */}
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">NRP {product.price}</span>
          <span className={`text-sm ${product.quantity > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        {product.requiresPrescription && (
          <div className="flex items-center text-amber-600 text-sm">
            <FaPrescription className="mr-1" />
            Prescription Required
          </div>
        )}
        <div className="flex space-x-2 mt-4">
          <button 
            className="flex-1 bg-primary text-white py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setSelectedProduct(product)}
          >
            Quick View
          </button>
          <button className="p-2 text-gray-600 hover:text-primary transition-colors">
            <FiHeart />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => handleAddToCart(product)}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
  
  const ProductListItem = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex gap-4">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-48 h-48 object-cover rounded-md"
        loading="lazy"
      />
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.genericName}</p>
        <p className="text-sm text-gray-600">{product.manufacturer}</p>
        <p className="text-sm text-gray-600">Category: {product.category?.name || "Uncategorized"}</p> {/* ✅ FIXED */}
        <p className="text-sm text-gray-700">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">NRP {product.price}</span>
          <div className="flex space-x-2">
            <button 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => setSelectedProduct(product)}
            >
              Quick View
            </button>
            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
              <FiHeart />
            </button>
            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} /> 
      <div className="min-h-screen bg-background p-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative flex-1 max-w-xl">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-600"}`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-white" : "text-gray-600"}`}
              >
                <FiList size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FiFilter className="mr-2" /> Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      className="w-full p-2 border border-input rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Manufacturer</label>
                    <select
                      className="w-full p-2 border border-input rounded-md"
                      value={selectedManufacturer}
                      onChange={(e) => setSelectedManufacturer(e.target.value)}
                    >
                      {manufacturers.map(manufacturer => (
                        <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">NPR {priceRange[1]}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="prescriptionOnly"
                      checked={showPrescriptionOnly}
                      onChange={(e) => setShowPrescriptionOnly(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="prescriptionOnly" className="text-sm">Prescription Only</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {loading ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <FaMedkit className="mx-auto text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <FaMedkit className="mx-auto text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600">No products found matching your criteria</p>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {filteredProducts.map(product => (
                    viewMode === "grid" ? 
                      <ProductCard key={product.id} product={product} /> :
                      <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="space-y-4">
                    <p className="text-gray-600"><span className="font-semibold">Generic Name:</span> {selectedProduct.genericName}</p>
                    <p className="text-gray-600"><span className="font-semibold">Manufacturer:</span> {selectedProduct.manufacturer}</p>
                    <p className="text-gray-600"><span className="font-semibold">Dosage:</span> {selectedProduct.dosage}</p>
                    <p className="text-gray-600"><span className="font-semibold">Price:</span> NPR {selectedProduct.price}</p>
                    <p className="text-gray-600"><span className="font-semibold">Stock:</span> {selectedProduct.quantity} units</p>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                    <div className="flex space-x-4">
                      <button 
                        className="flex-1 bg-primary text-white py-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to Cart
                      </button>
                      <button className="flex-1 border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition-colors">
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MedicineProductList;
