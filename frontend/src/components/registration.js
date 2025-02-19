import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./registration.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    usertype: "vendor",
  });

  const sendregisterData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Registration successful:", response.message);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error while sending data:", error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendregisterData();
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
            name="phone_number"
            value={formData.phone_number} 
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
            name="usertype"
            value={formData.usertype} 
            onChange={handleChange}
            className="register-input"
            required
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
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
