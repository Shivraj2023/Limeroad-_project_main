import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  { CLEAR_CART } from './cartslice';
import axios from "axios";

const SuccessPage = () => {
  const hasFetched = useRef(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasFetched.current) return; 
    hasFetched.current = true; 

    const processPayment = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const paymentResponse = await axios.post(
          "http://localhost:5000/process-payment",
          { cart },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (paymentResponse?.data) {
          
            console.log("Removing cart from localStorage...");
            dispatch(CLEAR_CART());
            console.log("Cart removed!");
                  
          
        }
      } catch (error) {
        console.log("Error during fetching:", error);
      }
    };

    processPayment();
  }, []); 

  return(
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white"
        style={{
          height: "60px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "0 20px",
        }}
      >
        <div className="container-fluid d-flex align-items-center">
          <Link className="navbar-brand" to="/?main=men">
            <img
              src="https://logos-world.net/wp-content/uploads/2023/01/Limeroad-Logo.jpg"
              alt="Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </Link>
        </div>
      </nav>

      {/* Success Message Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          height: "calc(100vh - 60px)", 
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          Your Order is Confirmed! 🎉
        </h1>
        <p style={{ color: "#555", fontSize: "18px" }}>
          Thank you for shopping with us!
        </p>

        <Link to="/?main=men">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Continue Shopping 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
