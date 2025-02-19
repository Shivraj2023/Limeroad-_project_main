const express= require("express");
const cors=require("cors");
const mysql=require("mysql2")
const app=express();

app.use(cors())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Shiv_gsb@20",
    database:"limeroad"
});
db.connect((err)=>{
if(err){
    console.log("mysql connection failed",err)
} else {
    console.log("the connection to mysql is succesfull !")
}
})

app.get('/',(req,res)=>{
    res.send("initaial page request you have amde")
})

app.get('/message',(req,res)=>{
    res.send("hello pls welcome")
})

 app.get('/customers',(req,res)=>{
    db.query(" select * from customer",(err,result)=>{
        if(err){
            res.status(500).send("database error"+err)
        } else{
            res.status(200).send(result);
        }
    })
 })
 app.get('/admins',(req,res)=>{
    db.query(" select * from admin",(err,result)=>{
        if(err){
            res.status(500).send("database error"+err)
        } else{
            res.status(200).send(result);
            
        }
    })
 })
 app.get('/vendors',(req,res)=>{
    db.query(" select * from vendor",(err,result)=>{
        if(err){
            res.status(500).send("database error"+err)
        } else{
            res.status(200).send(result);
        }
    })
 })

app.listen(5000, ()=>{
    console.log("the server set up is succesful and serving on port 5000")
})