const express = require("express");
const cors = require("cors");
const useRoutes=require("./router");
const connect_mongo_db=require("./config/db")
require("dotenv").config();
const app = express();

const port=process.env.PORT||5000;
connect_mongo_db();



app.use(cors());
app.use(express.json()); 



app.use('/', useRoutes);



app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

