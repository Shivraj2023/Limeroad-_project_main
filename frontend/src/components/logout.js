import React, { useContext } from 'react'
import { authContext } from './contextlogin';
import axios from 'axios';
import Swal from 'sweetalert2';

const Logout = () => {
    const useauthContext=useContext(authContext);
    const{username,logout}=useauthContext;
      
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
    <h6 style={{paddingTop:"5px",color:"blue"}}>{username}</h6>
  <button className="profile-login-btn" onClick={handleLogout}>Logout</button>
   </div>
  )
}

export default Logout;
