import React, { useContext } from 'react'
import { authContext } from './contextlogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Logout = () => {
    const useauthContext=useContext(authContext);
    const{username,logout,usertype}=useauthContext;
      
    const handleLogout=async()=>{
        
        try{
            const response= await axios.post("http://localhost:5000/logout",null,{
                 withCredentials:true,
            })
           
            Swal.fire({
                icon:'info',
                 title: 'Success!',
                 text: response.data.message||'You logged in successfully.',
             });

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
       <Link to="/addProducts"> 
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
