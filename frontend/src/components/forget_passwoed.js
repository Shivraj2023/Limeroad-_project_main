
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotpassword.css"; 

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset request for:", emailOrPhone);
    
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <p className="forgot-password-text">
          Enter your registered email or phone number to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label className="forgot-password-label">Email or Phone</label>
          <input
            type="text"
            name="emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="forgot-password-input"
            required
          />

          <button type="submit" className="forgot-password-button">
            SEND RESET LINK
          </button>
        </form>

        {/* Back to Login Link */}
        <p className="forgot-password-login-link">
          Remembered your password? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
