import React, { useState } from 'react';
import './addproducts.css';
/* 
const categories = [
  { value: "tshirt", label: "T-Shirt" },
  { value: "saree", label: "Saree" },
  { value: "pants", label: "Pants" },
  { value: "shoes", label: "Shoes" },
  { value: "jackets", label: "Jackets" },
  { value: "skirts", label: "Skirts" },
  { value: "jeans", label: "Jeans" },
  { value: "shorts", label: "Shorts" },
  { value: "dresses", label: "Dresses" },
  { value: "tops", label: "Tops" },
  { value: "sweaters", label: "Sweaters" },
  { value: "accessories", label: "Accessories" },
  { value: "ethnic", label: "Ethnic Wear" },
  { value: "formal", label: "Formal Wear" },
  { value: "casual", label: "Casual Wear" }
]; */

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProducts = () => {
  const [product, setProduct] = useState({
    mainCategory: "",
    title: "",
    Price: "",
    description: "",
    category: "",
    original_price: "",
    offer_percent: "",
    brand_name: "",
    brand_image: "",
    sizes: [],
    image: "",
    reviews: {
      ratings: "",
      count: ""
    }
  });

  const handleSizeChange = (size) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size]
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data here
    console.log("Submitted product:", product);
  };

  return (
    <div className="container">
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Main Category:</label>
          <select 
            id="category" 
            name="category" 
            value={product.category}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Product Title:</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Price">Price:</label>
          <input 
            type="number" 
            id="Price" 
            name="Price"
            value={product.Price}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Product Description:</label>
          <textarea 
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="textarea"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="original_price">Original Price:</label>
          <input 
            type="number" 
            id="original_price" 
            name="original_price"
            value={product.original_price}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="offer_percent">Offer Percent:</label>
          <input 
            type="number" 
            id="offer_percent" 
            name="offer_percent"
            value={product.offer_percent}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand_name">Brand Name:</label>
          <input 
            type="text"
            id="brand_name"
            name="brand_name"
            value={product.brand_name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand_image">Brand Image URL:</label>
          <input 
            type="url"
            id="brand_image"
            name="brand_image"
            value={product.brand_image}
            onChange={handleChange}
            className="input"
            placeholder="Enter the brand image URL"
          />
        </div>

        <div className="form-group">
          <h3>Select Available Sizes:</h3>
          <div className="checkbox-group">
            {sizes.map((size) => (
              <label key={size} className="checkbox-label">
                <input
                  type="checkbox"
                  value={size}
                  checked={product.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image URL:</label>
          <input 
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="input"
            placeholder="Enter the product image URL"
          />
        </div>

        <div className="form-group">
          <h3>Reviews</h3>
          <div className="review-group">
            <label htmlFor="reviews">Ratings:</label>
            <input 
              type="number" 
              id="reviews" 
              name="reviews"
              value={product.reviews.ratings}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="review-group">
            <label htmlFor="rating">Review Count:</label>
            <input 
              type="number"
              step="0.1"
              id="rating" 
              name="rating"
              value={product.reviews.count}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
