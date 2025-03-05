import { useEffect } from "react";
/* import { useSearchParams } from "react-router-dom"; */
import axios from "axios";

const SuccessPage = () => {
   
    

     useEffect(() => {
      
     
      const processPayment = async () => {
        const token=localStorage.getItem("authToken");
        if(token){
          try {
            const cart=localStorage.getItem("cart");
            const paymentResponse = await axios.post(
              "http://localhost:5000/process-payment",
              {cart},
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
              }
            );
            if(paymentResponse?.data){
              alert(paymentResponse.data.message)
              localStorage.removeItem("cart");
            }
           
                       
          } catch (error) {
            console.log("Error during fetching:", error);
          }
        }
        
      };
    
        processPayment();
    
    }, []);
       

    return <h1>Payment Successful! Order is being processed...</h1>;
};
export default SuccessPage;
