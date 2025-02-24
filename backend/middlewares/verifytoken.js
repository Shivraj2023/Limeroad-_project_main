const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const verifyToken = (req, res, next) => {
     console.log("reqqqq-----",req);
    console.log("token -----",req.cookies);
    const token = req.cookies.authToken;

    console.log("token=========",token)
  try {
     

    if(!token){
       return res.status(401).json({message:"invalid token or token expired"});
    }  
       
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
    req.user = decoded;
        
    next();
  } catch (error) {
     return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
