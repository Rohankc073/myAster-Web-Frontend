import React from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import ProductDetailComponent from "../components/ProductView/productView";

const ProductDetail = () => {
  const dummyProduct = {
    name: "Paracetamol 500mg Tablets",
    description:
      "Fast-acting pain relief medication suitable for headaches, fever, and general body pain.",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3",
    dosage: "1-2 tablets every 4-6 hours as needed",
    usage: "Take with or after meals. Do not exceed 8 tablets in 24 hours.",
    warnings: [
      "Keep out of reach of children",
      "Do not use with other medicines containing paracetamol",
      "Consult doctor if symptoms persist",
    ],
    stock: 50,
  };

  return (
    <div>
        <Navbar />
      <ProductDetailComponent product={dummyProduct} />
      <Footer  />
    </div>
  );
};

export default ProductDetail;
