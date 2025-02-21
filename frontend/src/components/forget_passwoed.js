
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotpassword.css"; 
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

   const passwordReset=async()=>{
      try{
        const response=await axios.post("http://localhost:5000/forgot-password",{email:email},{
          headers:{
            "Content-Type":"application/json",
          }
        })
        if(response.status===200){
     Swal.fire({
        icon:"success",
        title: 'Success!',
         text: `You password reset link sent successfully to ${email}`,
     });
        }
      }  catch(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was some error while sending the reset link. Please try again.",
        });
      }
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset();
    
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <p className="forgot-password-text">
          Enter your registered email or phone number to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label className="forgot-password-label">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
