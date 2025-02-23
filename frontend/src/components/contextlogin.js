import React, { createContext, useEffect, useState } from 'react'

 export const authContext=createContext();

function ContextloginProvider({children}) {

    const[isloggedin,setIsloggedin]=useState(false);
    const[username,setUsername]=useState('');
    const[usertype,setUsertype]=useState('');
    
    useEffect(()=>{
      let storedusername=localStorage.getItem("username");
      let storedusertype=localStorage.getItem("usertype");
      if(storedusername){
      setUsername(storedusername);
      setUsertype(storedusertype);
      setIsloggedin(true)
      }
    },[]);

    const login=(username)=>{
        setIsloggedin(true);
        setUsername(username);
        localStorage.setItem("username",username);
    }
    const logout=()=>{
        setIsloggedin(false);
        setUsername('');
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
       
    }
  return (
     <authContext.Provider  value={{isloggedin,setUsername,username,login,logout,setUsertype,usertype}}>
      {children}
    </authContext.Provider>
  )
}

export default  ContextloginProvider;

