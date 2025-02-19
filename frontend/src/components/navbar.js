import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navbar.css";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const [categories, setCategory] = useState({
    men: [],
    women: [],
    kids: [],
    home: [],
  });

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [search, setSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    fetch("/assets/assets.json")
      .then((response) => response.json())
      .then((data) => {
        const categoryMap = {
          men: new Set(),
          women: new Set(),
          kids: new Set(),
          home: new Set(),
        };

        if (data.mens_products) {
          data.mens_products.forEach((item) =>
            categoryMap.men.add(item.category)
          );
        }
        if (data.womens_products) {
          data.womens_products.forEach((item) =>
            categoryMap.women.add(item.category)
          );
        }
        if (data.kids_products) {
          data.kids_products.forEach((item) =>
            categoryMap.kids.add(item.category)
          );
        }
        if (data.home_products) {
          data.home_products.forEach((item) =>
            categoryMap.home.add(item.category)
          );
        }

        setCategory({
          men: Array.from(categoryMap.men),
          women: Array.from(categoryMap.women),
          kids: Array.from(categoryMap.kids),
          home: Array.from(categoryMap.home),
        });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategory({
          men: [],
          women: [],
          kids: [],
          home: [],
        });
      });
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg px-5 fixed-navbar"
      style={{ height: "60px", paddingTop: "5px", paddingBottom: "5px" }}
    >
      {!search ? (
        <div className="container-fluid px-3">
          <Link className="navbar-brand" to="/">
            <img
              src="https://logos-world.net/wp-content/uploads/2023/01/Limeroad-Logo.jpg"
              alt="Logo"
              width="100%"
              height="60"
              className="d-inline-block align-text-top"
            />
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {Object.keys(categories).map((category) => (
                <div
                  key={category}
                  className="nav-item fs-6 dropdown-container"
                  onMouseEnter={() => setActiveDropdown(category)}
                  onMouseLeave={() => setActiveDropdown(null)}
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

          <div className="d-flex align-items-center">
            {/* Search Icon */}
            <div
              className="d-flex flex-column align-items-center p-3 ps-2"
              onClick={() => {
                setSearch(true);
              }}
            >
              <i className="fa-solid fa-magnifying-glass fs-6"></i>
              <span className="fs-6">Search</span>
            </div>

            {/* Cart Icon */}
            <div className="d-flex flex-column align-items-center p-3 ps-3">
              <Link to="/cartpage" className="cart-link">
                <i className="fa-solid fa-cart-shopping fs-6"></i>
                <span className="fs-6">Cart</span>
                {totalItems > 0 && (
                  <div className="cart-item-count">{totalItems}</div>
                )}
              </Link>
            </div>

            {/* Profile Dropdown */}
            <div
              className="d-flex flex-column align-items-center p-3 pe-1 profile-container"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <i className="fa-solid fa-user fs-6"></i>
              <span className="fs-6">Profile</span>

              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <h6 className="profile-welcome">Welcome</h6>
                  <p className="profile-text">To view your account details</p>
                  <Link to="/login">
                    <button className="profile-login-btn">Login</button>
                  </Link>
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
          <button className="close-btn" onClick={() => setSearch(false)}>
            ✖
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
