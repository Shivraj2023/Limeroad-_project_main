
const express=require("express");
const mysql=require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
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

module.exports=db;