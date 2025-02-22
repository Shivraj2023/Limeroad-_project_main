const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser");

const useRoutes=require("./router");
const connect_mongo_db=require("./config/db")
require("dotenv").config();

const app = express();
app.use(cookieParser());

const port=process.env.PORT||5000;
connect_mongo_db();



app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json()); 



app.use('/', useRoutes);



app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

