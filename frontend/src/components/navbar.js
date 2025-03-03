import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authContext } from "./contextlogin";
import axios from "axios";
import Logout from "./logout";

import "./navbar.css";

function Navbar() {
  const useauthContext=useContext(authContext);
  const {isloggedin}=useauthContext;

  const [activeDropdown, SetActiveDropdown] = useState(null);
  const [search, SetSearch] = useState(false);
  const [showProfileDropdown, SetShowProfileDropdown] = useState(false);
  

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const [categories, SetCategory] = useState({
    men: [],
    women: [],
    kids: [],
    home: [],
  });

  

      useEffect(()=>{
       const Fetchdata=async()=>{

        try{
          const response= await axios.get("http://localhost:5000/products")
          
             const data=response.data.products;
            
            const categoryMap={
              men:new Set(),
              women:new Set(),
              kids:new Set(),
              home:new Set(),
            }
         data.forEach(item => {
          if(item.mainCategory&&categoryMap[item.mainCategory]){
            categoryMap[item.mainCategory].add(item.category)
          }
         });
                           
          SetCategory({
            men:Array.from(categoryMap.men),
            women:Array.from(categoryMap.women),
            kids:Array.from(categoryMap.kids),
            home:Array.from(categoryMap.home)
          })
          
        
        }
          catch(error){
            console.error("Error fetching products:", error);
            SetCategory({
              men: [],
              women: [],
              kids: [],
              home: [],
            });
          }
        }
        Fetchdata();
      },[]);

  
  return (
    <div className="page-container">
    <nav
    className="navbar navbar-expand-lg px-5 fixed-navbar"
    style={{ height: "60px", paddingTop: "5px", paddingBottom: "5px" }}
  >
    {!search ? (
      <div className="container-fluid d-flex align-items-center justify-content-between px-3">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://logos-world.net/wp-content/uploads/2023/01/Limeroad-Logo.jpg"
            alt="Logo"
            width="100%"
            height="60"
            className="d-inline-block align-text-top"
          />
        </Link>
  
       <button
          className="navbar-toggler ms-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "none", outline: "none", fontSize: "1.5rem", paddingLeft: "15px"}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {Object.keys(categories).map((category) => (
              <div
                key={category}
                className="nav-item fs-6 dropdown-container"
                onMouseEnter={() => SetActiveDropdown(category)}
                onMouseLeave={() => SetActiveDropdown(null)}
              >
                <li className="nav-item">
                  <Link
                    className="nav-link ps-5 fw-bold nav-child"
                    to={`/${category}`}
                  >
                    {category.toUpperCase()}
                  </Link>
                </li>
                {activeDropdown === category && (
                  <ul className="dropdown-menu">
                    {categories[category].map((subCategory, i) => (
                      <li key={i}>
                        <Link
                          className="dropdown-item"
                          to={`/${category}/${subCategory
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {subCategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
  
            <li className="nav-item">
              <Link
                className="nav-link ps-5 fs-6 text-danger fw-bold"
                to="/offers"
              >
                OFFERS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link ps-5 fs-6 text-danger fw-bold"
                to="/vmart"
              >
                VMART
              </Link>
            </li>
          </ul>
        </div>
  
        {/* Icons (Search, Cart, Profile) */}
        <div className="d-flex align-items-center">
          <div
            className="d-flex flex-column align-items-center p-3 ps-2"
            onClick={() => SetSearch(true)}
          >
            <i className="fa-solid fa-magnifying-glass fs-6"></i>
            <span className="fs-6">Search</span>
          </div>
  
          <div className="d-flex flex-column align-items-center p-3 ps-3">
            <Link to="/cartpage" className="cart-link">
              <i className="fa-solid fa-cart-shopping fs-6"></i>
              <span className="fs-6">Cart</span>
              {totalItems > 0 && (
                <div className="cart-item-count">{totalItems}</div>
              )}
            </Link>
          </div>
  
          <div
            className="d-flex flex-column align-items-center p-3 pe-1 profile-container"
            onMouseEnter={() => SetShowProfileDropdown(true)}
            onMouseLeave={() => SetShowProfileDropdown(false)}
          >
            <i className="fa-solid fa-user fs-6"></i>
            <span className="fs-6">Profile</span>
  
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <h6 className="profile-welcome">Welcome</h6>
                <p className="profile-text">To view your account details</p>
                {isloggedin ? (
                  <div>
                    <Logout />
                  </div>
                ) : (
                  <Link to="/login">
                    <button className="profile-login-btn">Login</button>
                  </Link>
                )}
                <hr className="profile-divider" />
                <div className="profile-links">
                  <Link to="/orders" className="profile-link">ORDERS</Link>
                  <Link to="/returns" className="profile-link">RETURNS</Link>
                  <Link to="/replacements" className="profile-link">REPLACEMENT</Link>
                  <Link to="/lr-credits" className="profile-link">LR CREDITS</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div className="search-overlay">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-icon-inside"></i>
          <input
            type="text"
            placeholder="What are you looking for..."
            className="search-input"
            autoFocus
          />
        </div>
        <button className="close-btn" onClick={() => SetSearch(false)}>✖</button>
      </div>
    )}
  </nav>
  </div>
  );
}

export default Navbar;
