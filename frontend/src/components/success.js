import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [hasProcessed, setHasProcessed] = useState(false);
 
     const cart=localStorage.getItem("cart");
     console.log("cart======",cart);
     const token=localStorage.getItem("authToken");
     console.log("auth--------",token);

     useEffect(() => {
      const processPayment = async () => {
        try {
          const paymentResponse = await axios.post(
            "http://localhost:5000/process-payment",
            { cart: cart, sessionId: sessionId },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          );
          console.log("Successfully processed", paymentResponse.data);
          localStorage.removeItem("cart");
          setHasProcessed(true);
        } catch (error) {
          console.log("Error during fetching:", error);
        }
      };
    
      if (sessionId && !hasProcessed) {
        processPayment();
    }
    }, [sessionId,hasProcessed]);
       

    return <h1>Payment Successful! Order is being processed...</h1>;
};
export default SuccessPage;
