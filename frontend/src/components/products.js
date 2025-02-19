import React, { useState, useEffect } from "react";
import ProductPage from "./reuableproducts"; // Importing the child component
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState({});

  // Fetching the product data once on component mount
  useEffect(() => {
    fetch("/assets/assets.json") // Ensure the path to the JSON file is correct
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load product data.");
        return response.json();
      })
      .then((data) => {
        // Mapping data to products (you can extend it with other categories if needed)
        console.log(data);
        setProducts(data); // Set the entire products data
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Only run once when the component is mounted

  return (
    <div className="products-container">
       {Object.keys(products).length > 0 ?  (
        // Passing the entire products data as props to the child component
        <ProductPage products={products} />
      ) : (
        <p className="no-products">No products available.</p>
      )}
    </div>
  );
};

export default Products;
