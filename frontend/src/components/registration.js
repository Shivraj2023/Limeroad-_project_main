import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import axios from "axios";
import "./registration.css";

const Register = () => {

  const navigateto=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    usertype: "vendor",
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const sendregisterData = async (e) => {
    e.preventDefault();
     if(!validatePasswords()) return;
    try {
     
      const response = await axios.post("http://localhost:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
       
      console.log("Registration successful:", response.data.message);
      Swal.fire({
         title: 'Success!',
        text: `you succesfully registerd as ${formData.usertype}`,
        imageUrl:"https://www.shutterstock.com/shutterstock/photos/2423097831/display_1500/stock-vector-approved-checklist-icon-checklist-on-d-paper-document-in-test-form-with-check-marks-and-stripes-2423097831.jpg",
        imageWidth:400,
        imageHeight:300,
        imageAlt:"image"
      });
      navigateto("/login")

    }
     catch (error) {
      console.error("Error while sending data:", error.response ? error.response.data: error.message);
      alert(`Error while sending data:${ error.response ? error.response.data.error : error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const validatePasswords = () => {
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }
    setError('');
    return true;
  };

 

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={sendregisterData} className="register-form">
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
          <label className="register-label">Re-confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
