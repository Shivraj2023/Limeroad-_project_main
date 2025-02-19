
import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import './reusable.css';

const ProductPage = ( {products}) => {

   const { category, subcategory } = useParams();

   const [filteredProducts, setFilteredProducts] = useState([]);
   const [baseFilteredProducts, setBaseFilteredProducts] = useState([]);
   const[filters,setFilters]=useState({price:null,discount:null})
   const [selectedFilters, setSelectedFilters] = useState({});
   const [categories, setCategories] = useState([]);
  
   useEffect(() => {
      if (category) {
      
      let categoryKey = "";
      if (category === "men" || category === "women") {
        categoryKey = `${category.toLowerCase()}s_products`;
      } else if (category === "kids" || category === "home") {
        categoryKey = `${category.toLowerCase()}_products`; 
      }
  
      if (categoryKey && products[categoryKey]) {
        const categoryList = [...new Set(products[categoryKey].map((product) => product.category))];
        setCategories(categoryList); 
             }
        
      if (subcategory) {
           const filtered = products[categoryKey]?.filter(
          (product) =>
            product.category.toLowerCase() === subcategory.toLowerCase() // Filter by subcategory
           ) 

        setFilteredProducts(filtered);
        setBaseFilteredProducts(filtered)
      } else {
        // Filter products based only on category
        const filtered = products[categoryKey]
               
        setFilteredProducts(filtered);
        setBaseFilteredProducts(filtered)
      }
    } else {
      setBaseFilteredProducts([]);
      setFilteredProducts([]);
      setCategories([]);
    }
  }, [category, subcategory, products]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  const applyFilters = () => {
    setSelectedFilters(filters); 
        let filtered = [...baseFilteredProducts];
    
      if (filters.price) {
      filtered = filtered.filter(product => product.price <= parseInt(filters.price));
    }

      if (filters.discount) {
      filtered = filtered.filter(product => product.offer_percent >= parseInt(filters.discount));
    }

      setFilteredProducts(filtered);
  };

  
  

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3 p-3 border-end">
          <h5>Filters</h5>
          <form>
          <label>Max Price:</label>
            <select className="form-select mb-3" name="price" onChange={handleFilterChange}>
              <option value="">Select</option>
              <option value="500">Under ₹500</option>
              <option value="1000">Under ₹1000</option>
              <option value="2000">Under ₹2000</option>
            </select>
            <label>Min Discount:</label>
            <select className="form-select mb-3" name="discount" onChange={handleFilterChange}>
              <option value="">Select</option>
              <option value="10">10% or more</option>
              <option value="20">20% or more</option>
              <option value="50">50% or more</option>
            </select>

            <button type="button" className="btn btn-primary" onClick={applyFilters}>
              Apply Filters
            </button>
          </form>
        </div>

        {/* Product Display */}
        <div className="col-md-9 p-3">
        
      {/* Categories Section */}
      <div className="d-flex flex-wrap ps-5 mb-3">
    {categories.map((category, index) => (
      <span key={index} className="badge bg-light text-black p-2  ms-4 me-4 mb-3" style={{backgroundColor:"white", border:"1px solid grey",borderRadius: "10%"}}>
        {category}
      </span>
    ))}
      </div>
          <div className="row">
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card new-card">
                  <Link to={`/products/${category}/${product.id}`}>
  <img key={product.image} src={product.image} className="card-img-top" alt={product.name} />
</Link>

                    <div className="card-body">
                      <p className="card-text">
                        ₹{product.price} &nbsp;
                    {product.offer_percent}% off </p>
                      <div className="icons">
                        <span className="heart-icon">
                          <i className="fa-regular fa-heart"></i>
                        </span>
                        <span className="whatsapp-icon">
                          <i className="fa-brands fa-whatsapp"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
