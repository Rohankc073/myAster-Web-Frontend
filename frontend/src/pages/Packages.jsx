import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const PackageCard = ({ pkg }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
    <img 
      src={pkg.image ? pkg.image : "/images/default-package.png"} 
      alt={pkg.name}
      className="w-full h-48 object-cover rounded-md mb-4"
      loading="lazy"
    />
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
      <p className="text-sm text-gray-600">{pkg.description}</p>
      <p className="text-sm text-gray-600">{pkg.servicesIncluded.join(", ")}</p>
      <div className="flex justify-between items-center">
        <span className="text-primary font-bold">NPR {pkg.price}</span>
        <span className="text-sm text-gray-500">{pkg.duration} Days</span>
      </div>
      <button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors">
        Book Now
      </button>
    </div>
  </div>
);

const PackagesPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageCategories, setPackageCategories] = useState(["All"]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5003/packages");
        setPackages(response.data);

        // ✅ Extract unique package names dynamically for filtering
        const uniqueCategories = ["All", ...new Set(response.data.map(pkg => pkg.name))];
        setPackageCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    let filtered = packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || pkg.name === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // ✅ Sorting Logic
    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "most-popular") {
      filtered.sort((a, b) => b.popularity - a.popularity); // Assuming popularity field exists
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortOption, packages]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative flex-1 max-w-xl">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search health packages..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-600"}`}>
                <FiGrid size={20} />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-white" : "text-gray-600"}`}>
                <FiList size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <FiFilter className="mr-2" /> Filters
              </h3>
              
              {/* ✅ Category Filter */}
              <label className="block text-sm font-medium mb-2">Package Name</label>
              <select
                className="w-full p-2 border border-input rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {packageCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* ✅ Sorting Filter */}
              <label className="block text-sm font-medium mt-4 mb-2">Sort By</label>
              <select
                className="w-full p-2 border border-input rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="most-popular">Most Popular</option>
              </select>
            </div>

            <div className="md:col-span-3">
              {loading ? (
                <p className="text-center text-gray-600">Loading packages...</p>
              ) : filteredPackages.length === 0 ? (
                <p className="text-center text-gray-600">No packages found</p>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {filteredPackages.map(pkg => (
                    <PackageCard key={pkg._id} pkg={pkg} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackagesPage;
