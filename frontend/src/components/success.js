import { useEffect, useRef } from "react";
import axios from "axios";

const SuccessPage = () => {
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (hasFetched.current) return; 

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
          alert(paymentResponse.data.message);
          localStorage.removeItem("cart");
          hasFetched.current = true; 
        }
      } catch (error) {
        console.log("Error during fetching:", error);
      }
    };

    processPayment();
  }, []); 

  return <h1>Payment Successful! Order is being processed...</h1>;
};

export default SuccessPage;
