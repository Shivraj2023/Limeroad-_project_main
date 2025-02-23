
const express=require("express");
const mongoose=require("mongoose");
const env=require("dotenv")
env.config()

// connecting to the mogo db here using url from the env file 


let connect_mongo_db =  async ()=>{
        try{
            await mongoose.connect(process.env.MONGO_DB_URL);
            console.log(" conneted mongo db database")
        }
        catch(error){
            console.log("error while connectting to mongo db databses:",error)
        }
}

module.exports = connect_mongo_db;































/* const db = mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err);
    } else {
        console.log("The connection to MySQL is successful!");
    }
});

module.exports=db; */