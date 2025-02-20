import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 

const Login = () => {
  const [logindata, setLogindata] = useState({
    phone_number: '',
    email: '',
    usertype: '',
  });

  const navigate = useNavigate();

  const logincheck = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", logindata, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        alert("You logged in successfully");
        navigate("/");
      }
    } catch (error) {
      alert("There is an error: Please enter valid credentials");
    }
  };

  const handleChange = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await logincheck();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
          alt="User"
          className="login-avatar"
        />
        <h2 className="login-title">
          <i className="fa-solid fa-user"></i> SIGN IN
        </h2>
        <p className="login-subtext">Sign in to proceed further</p>
      </div>

      {/* Use form and onSubmit */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">Mobile Number</label>
        <input
          type="text"
          name="phone_number"
          value={logindata.phone_number}
          onChange={handleChange}
          className="login-input"
          required
        />

        <label className="login-label">Email</label>
        <input
          type="email"
          name="email"
          value={logindata.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <label className="register-label">login as</label>
        <select
          name="usertype"
          value={logindata.usertype}
          onChange={handleChange}
          className="register-input"
          required
        >
          <option value="">Select User Type</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="login-button"
          type="submit"
          disabled={!logindata.phone_number || !logindata.email || !logindata.usertype}
        >
          NEXT
        </button>

        <div className="login-options">
          <Link to="/forgot-password" className="login-link">
            Forgot Password?
          </Link>
          <Link to="/register" className="login-link">
            New User? Register Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
