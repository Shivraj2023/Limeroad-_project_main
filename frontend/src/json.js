import React, { useEffect,useState } from 'react'

function Json() {
     const[data,setData]= useState(null);
    useEffect( ()=>{
        fetch('/assets/assets.json')
        .then( (response)=> response.json())
        .then( (data)=>setData(data))
    },[])
  return (
    <div>
      <h2>JSON Data</h2>
      <pre style={{ background: "#f4f4f4", padding: "10px" }}>
        {data ? JSON.stringify(data,null,2) : "Loading..."}
      </pre>
    </div>
  );
};

export default Json;
