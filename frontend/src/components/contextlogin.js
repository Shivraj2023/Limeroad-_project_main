import React, { createContext, useEffect, useState } from 'react'

 export const authContext=createContext();

function ContextloginProvider({children}) {

    const[isloggedin,setIsloggedin]=useState(false);
    const[username,setUsername]=useState('');
    
    useEffect(()=>{
      let storedusername=localStorage.getItem("username");
      if(storedusername){
      setUsername(storedusername)
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
        localStorage.removeItem('username')
       
    }
  return (
     <authContext.Provider  value={{isloggedin,setUsername,username,login,logout}}>
      {children}
    </authContext.Provider>
  )
}

export default  ContextloginProvider;

