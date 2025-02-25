import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './vendorproduct.css';


const VendorProducts = () => {

    const[vendorProducts,setVendorProducts]=useState([]);

   useEffect(()=>{

    const fetchVendorProducts=async()=>{
      try{
        const token = localStorage.getItem("authToken");
           const response=await axios.get("http://localhost:5000/vendorProducts",{
            headers: {
                Authorization: `Bearer ${token}`
             }
           });
           setVendorProducts(response.data.products);
           console.log("vendorProducts-----",response.data.products);
      } 
       catch(error){
               console.error("Error fetching vendor products:", error);
      }
    }
  
    fetchVendorProducts();
   },[])

  return (
    <div className="vendor-products-container">
    <h2 className="vendor-products-heading">My Products</h2>
    
    <div className="vendor-products-list row">
      {vendorProducts.map((product) => (
        <div key={product._id} className="col-md-4 vendor-product-card">
          <div className="vendor-product-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="vendor-product-img"
            />
            <div className="vendor-product-info">
              <h5 className="vendor-product-title">{product.title}</h5>
              <p className="vendor-product-price">₹{product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default VendorProducts;
