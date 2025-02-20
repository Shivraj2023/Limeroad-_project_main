const express = require("express");
const cors = require("cors");
const useRoutes=require("./router");
const db=require("./db")
require("dotenv").config();
const app = express();

const port=process.env.PORT||5000;



app.use(cors());
app.use(express.json()); 



app.use('/', useRoutes);



app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

