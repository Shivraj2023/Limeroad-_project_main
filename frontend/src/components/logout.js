import React, { useContext } from 'react'
import { authContext } from './contextlogin';
import { CLEAR_CART } from './cartslice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Logout = () => {
    const useauthContext=useContext(authContext);
    const{username,logout,usertype}=useauthContext;
      
      const dispatch=useDispatch();
    const handleLogout=async()=>{
        
        try{

          const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
          console.log("cartitems here when i deletd all the products",cartItems)
           console.log(cartItems);
          
            const token = localStorage.getItem("authToken"); 
            console.log("token sent for request====>",token);
            const addCartResponse = await axios.post("http://localhost:5000/addcartproducts", { cartItems }, {
         headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
       });

          

          const response= await axios.post("http://localhost:5000/logout");
           
            Swal.fire({
                icon:'info',
                 title: 'Success!',
                 text: response.data.message||'You logged in successfully.',
             });
             localStorage.removeItem("authToken");
             localStorage.removeItem("cart");
            
             dispatch(CLEAR_CART());
             logout();

        }  catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Logout failed, please try again!',
              });
            console.log("logout failed",error);
        }
     }


  return (
    <div> 
      {usertype==="vendor"?(
        <>
        <h6 style={{paddingTop:"2px", color: "#e74c3c",fontWeight:"bold"}}>{username}</h6>
       <Link to="/addproducts"> 
       <button style={{
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
      marginBottom:"10px",
      transition: "background-color 0.3s ease",
    }}>Add products</button> </Link>
  <button className="profile-login-btn" onClick={handleLogout}>Logout</button>
  </>):( 
       <>
     <h6 style={{paddingTop:"5px",color:"blue"}}>{username}</h6>
     <button className="profile-login-btn" onClick={handleLogout}>Logout</button>
    </> )}
   </div>
  )
}

export default Logout;
