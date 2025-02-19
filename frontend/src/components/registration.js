import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./registration.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "vendor", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {/* Name */}
          <label className="register-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
            required
          />

          {/* Email */}
          <label className="register-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            required
          />

          {/* Phone */}
          <label className="register-label">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="register-input"
            required
          />

          {/* Password */}
          <label className="register-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            required
          />

          {/* Role Selection */}
          <label className="register-label">Register as</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="register-input"
            required
          >
            <option value="vendor">Vendor</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>

          {/* Submit Button */}
          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>

        
        <p className="register-login-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
