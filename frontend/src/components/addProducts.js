import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './addproducts.css';
 
const categories = [
  { value: "t-shirt", label: "t-shirt" },
  { value: "shirts", label: "shirts" },
  { value: "trousers", label: "trousers" },
  { value: "footwear", label: "footwear" },
  { value: "jackets", label: "jackets" },
  { value: "winter-wears", label: "winter-wears" },
  { value: "boxers", label: "boxers" },
  { value: "mens_kurtas", label: "mens_kurtas" },
  { value: "sarees", label: "sarees" },
  { value: "kurtas", label: "kurtas" },
  { value: "jewellery", label: "jewellery" },
  { value: "tops", label: "tops" },
  { value: "ethenic-wear", label: "ethenic-wear" },
  { value: "kaftans", label: "kaftans" },
  { value: "coats", label: "coats" },
  { value: "bottom-wear", label: "bottom-wear" },
  { value: "suit-sets", label: "suit-sets" },
  { value: "sweatshirts", label: "sweatshirts" },
  { value: "home-essentials", label: "home-essentials" },
]; 

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProducts = () => {
  const [product, setProduct] = useState({
    mainCategory: "",
    title: "",
    price: "",
    description: "",
    category: "",
    original_price: "",
    offer_percent: "",
    brand_name: "",
    brand_image: "",
    size: [],
    image: "",
    reviews: {
      ratings: "",
      count: ""
    }
  });

  const handleSizeChange = (size) => {
    setProduct(prev => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size]
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setProduct((prev) => ({
      ...prev,
      category: selectedOption ? selectedOption.value : ""
    }));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    if (name === "reviews" || name === "rating") {
      setProduct(prev => ({
        ...prev,
        reviews: {
          ...prev.reviews,
          ratings: name === "reviews" ? value : prev.reviews.ratings,
          count: name === "rating" ? value : prev.reviews.count
        }
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
     try{
      const token = localStorage.getItem("authToken");
      console.log("tokenn------",token);
      const response= await axios.post("http://localhost:5000/addproducts",product,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200 || response.status === 201){
          console.log(response.data.message);
          alert("success message:",response.data.message)
          console.log('result=======>',response.data)
          console.log(response.data.message);
          setProduct({
            mainCategory: "",
            title: "",
            price: "",
            description: "",
            category: "",
            original_price: "",
            offer_percent: "",
            brand_name: "",
            brand_image: "",
            size: [],
            image: "",
            reviews: {
              ratings: "",
              count: ""
            }
          });
        }

     } 
     catch(error){
      alert(" error message:",error.response.data.error)
      console.log("error--------->",error.response.data.message);
     }
    /* console.log("Submitted product:", product); */
  };

  return (
    <div className="add-products">
      <h1 className='add-process_heading'>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-products_form-group">
          <label htmlFor="category">Main Category:</label>
          <select 
          id="mainCategory" 
          name="mainCategory"  
          value={product.mainCategory} 
          onChange={handleChange} 
          className="add-products_select"
            >
         <option value="">Select</option>
        <option value="men">Men</option>
         <option value="women">Women</option>
           <option value="kids">Kids</option>
           <option value="home">Home</option>
          </select>
        </div>

        <div className="add-products_form-group">
          <label htmlFor="title">Product Title:</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="add-products_input"
            required
          />
        </div>

        <div className="add-products_form-group">
          <label htmlFor="Price">Price:</label>
          <input 
            type="number" 
            id="price" 
            name="price"
            value={product.price}
            onChange={handleChange}
            className="add-products_input"
            required
          />
        </div>

        <div className="add-products_form-group">
          <label htmlFor="description">Product Description:</label>
          <textarea 
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="add-products_textarea"
            required
          />
        </div>

        <div className="add-products_form-group">
       <label htmlFor="category">Main Category:</label>
        <Select
         id="category"
          name="category"
         options={categories}
         onChange={handleCategoryChange}
          placeholder="Select a category"
    
    // value={categories.find(option => option.value === product.category)}
  />
</div>

        <div className="add-products_form-group">
          <label htmlFor="original_price">Original Price:</label>
          <input 
            type="number" 
            id="original_price" 
            name="original_price"
            value={product.original_price}
            onChange={handleChange}
            className="add-products_input"
            required
          />
        </div>

        <div className="add-products_form-group">
          <label htmlFor="offer_percent">Offer Percent:</label>
          <input 
            type="number" 
            id="offer_percent" 
            name="offer_percent"
            value={product.offer_percent}
            onChange={handleChange}
            className="add-products_input"
            required
          />
        </div>

        <div className="add-products_form-group">
          <label htmlFor="brand_name">Brand Name:</label>
          <input 
            type="text"
            id="brand_name"
            name="brand_name"
            value={product.brand_name}
            onChange={handleChange}
            className="add-products_input"
            required
          />
        </div>

        <div className="add-products_form-group">
          <label htmlFor="brand_image">Brand Image URL:</label>
          <input 
            type="url"
            id="brand_image"
            name="brand_image"
            value={product.brand_image}
            onChange={handleChange}
            className="add-products_input"
            placeholder="Enter the brand image URL"
          />
        </div>

        <div className="add-products_form-group">
          <h5>Select Available Sizes:</h5>
          <div className="checkbox-group">
            {sizes.map((size) => (
              <label key={size} className="checkbox-label">
                <input
                  type="checkbox"
                  value={size}
                  checked={product.size.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className='add-products_checkbox-group'
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div className="add-products_form-group">
          <label htmlFor="image">Product Image URL:</label>
          <input 
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="add-products_input"
            placeholder="Enter the product image URL"
          />
        </div>

        <div className="add-products_form-group">
          <h5>Reviews</h5>
          <div className="review-group">
            <label htmlFor="reviews">Ratings:</label>
            <input 
              type="number" 
              id="reviews" 
              name="reviews"
              value={product.reviews.ratings}
              onChange={handleChange}
              className="add-products_input"
              required
            />
          </div>
          <div className="add-products_form-group">
            <label htmlFor="rating">Review Count:</label>
            <input 
              type="number"
              step="0.1"
              id="rating" 
              name="rating"
              value={product.reviews.count}
              onChange={handleChange}
              className="add-products_input"
              required
            />
          </div>
        </div>

        <div className="add-products_form-group">
          <button type="submit" className="add-products_btn">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
