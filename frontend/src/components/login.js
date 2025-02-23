import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { authContext } from "./contextlogin";
import "./Login.css"; 

const Login = () => {
    const useauthContext=useContext(authContext);
    const {login,setUsertype}=useauthContext;

  const [logindata, setLogindata] = useState({
       email: '',
       password: '',
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
        localStorage.setItem("usertype",response.data.usertype);
        
        setUsertype(response.data.usertype);
        login(response.data.name);
           
         Swal.fire({
                 title: 'Success!',
                text: 'You logged in successfully.',
                 imageUrl:"https://www.shutterstock.com/shutterstock/photos/2099041108/display_1500/stock-vector-login-success-concept-illustration-flat-design-vector-eps-modern-graphic-element-for-landing-2099041108.jpg",
                imageWidth:400,
                imageHeight:300,
                imageAlt:"image"
              });
            setTimeout(()=>{
            navigate("/")
           },1500) ; 
      }
    } catch (error) {

      if(error.response){
        alert(`There is an error: ${error.response.data.error || "Please enter valid credentials"}`);
      } else {
      alert("There is an error: Please enter valid credentials");
      }
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
        {/* <label className="login-label">Mobile Number:</label>
        <input
          type="text"
          name="phone_number"
          value={logindata.phone_number}
          onChange={handleChange}
          className="login-input"
          required
        /> */}

        <label className="login-label">Email:</label>
        <input
          type="email"
          name="email"
          value={logindata.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <label className="login-label">Password:</label>
          <input
            type="password"
            name="password"
            value={logindata.password}
            onChange={handleChange}
            className="login-input"
            required
          />
        

        <button
          className="login-button"
          type="submit"
          disabled={!logindata.password || !logindata.email }
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
