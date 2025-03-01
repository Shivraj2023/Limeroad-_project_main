const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser=require("cookie-parser");


 



const app = express();
app.use(cookieParser());


const useRoutes=require("./router");
const connect_mongo_db=require("./config/db")



const port=process.env.PORT||5000;
connect_mongo_db();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


app.use('/uploaded_images',express.static("uploaded_images"));
app.use('/', useRoutes);



app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

