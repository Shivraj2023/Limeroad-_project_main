import axios from 'axios';
import React, { useState } from 'react';
import { Link,useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./resetpassword.css";

function Resetpassword() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navagate=useNavigate();
  const[searchParams]=useSearchParams();
  const resetpassToken=searchParams.get('token')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePasswords = () => {
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }
    setError('');
    return true;
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    
    try {
      const response = await axios.post("http://localhost:5000/reset-password",{...formData,resetpassToken},{
          headers:{
            "Content-Type":"application/json"
          }
      } 
        
      );
      if (response.status === 200) {
         Swal.fire({
                 icon:"success",
                 title: 'Success!',
                  text: `Your password upadted succesfully for the email-- ${formData.email}`,
              });
        navagate("/login")
      }
    } catch (error) {
      alert("There is some error");
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

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={changePassword} className="reset-password-form">
          <label className="reset-password-label">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="reset-password-input"
            required
          />
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="reset-password-button">
            RESET PASSWORD
          </button>
        </form>
        <p className="reset-password-login-link">
          Remembered your password? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>

  );
}

export default Resetpassword;
