import React from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import ProductBox from "../components/ProductBox/productBox";

const ProductPage = () => {
  // Dummy data for products
  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 99.0,
      oldPrice: 79.0,
      onSale: true,
      image: "/images/neZnfwBHi0f-4TivjA6BS.png",
    },
    {
      id: 2,
      name: "Fresh Oranges",
      price: 89.0,
      oldPrice: 69.0,
      onSale: true,
      image: "/images/exH8iOZwkjQekSALkXCZb.png",
    },
    {
      id: 3,
      name: "Fresh Grapes",
      price: 109.0,
      oldPrice: 89.0,
      onSale: false,
      image: "/images/86WxAQqZpR5CqrhSPKwNv.png",
    },
    {
      id: 4,
      name: "Fresh Bananas",
      price: 79.0,
      onSale: false,
      image: "/images/0RV9Zy3daoeMbDmTOOMKm.png",
    },
    {
      id: 5,
      name: "Fresh Mangoes",
      price: 119.0,
      oldPrice: 99.0,
      onSale: true,
      image: "/images/1DULzCtZvWhr5q5DDT6Ac.png",
    },
  ];

  return (
    <>
    <Navbar />
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20 mt-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Pharmacy Products
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {products.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default ProductPage;
