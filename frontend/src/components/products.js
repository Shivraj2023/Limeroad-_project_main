import React, { useState, useEffect } from "react";
import ProductPage from "./reuableproducts"; 
import axios from "axios";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState({});


  useEffect(()=>{
    const Fetchdata=async()=>{

     try{
       const response= await axios.get("http://localhost:5000/products")
       
          const data=response.data.products;
          console.log("data======>",data);
         const categoryMap={
           men:new Set(),
           women:new Set(),
           kids:new Set(),
           home:new Set(),
         }
      data.forEach(item => {
       if(item.mainCategory&&categoryMap[item.mainCategory]){
         categoryMap[item.mainCategory].add(item)
       }
      });
          
           
       setProducts({
         men:Array.from(categoryMap.men),
         women:Array.from(categoryMap.women),
         kids:Array.from(categoryMap.kids),
         home:Array.from(categoryMap.home)
       })
       
     
     }
       catch(error){
         console.error("Error fetching products:", error);
       }
     }

     Fetchdata();
   },[]);
 
  /* useEffect(() => {
    fetch("/assets/assets.json") 
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load product data.");
        return response.json();
      })
      .then((data) => {
        
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []); */

  return (
    <div className="products-container">
       {Object.keys(products).length > 0 ?  (
        
        <ProductPage products={products} />
      ) : (
        <p className="no-products">No products available.</p>
      )}
    </div>
  );
};

export default Products;
