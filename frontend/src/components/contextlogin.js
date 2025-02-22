import React, { createContext, useState } from 'react'

 export const authContext=createContext();

function ContextloginProvider({children}) {

    const[isloggedin,setIsloggedin]=useState('false');
    const[username,setUsername]=useState('');

    const login=()=>{
        setIsloggedin(true);
    }
    const logout=()=>{
        setIsloggedin(false);
       
    }
  return (
     <authContext.Provider  value={{isloggedin,setUsername,username,login,logout}}>
      {children}
    </authContext.Provider>
  )
}

export default  ContextloginProvider;

