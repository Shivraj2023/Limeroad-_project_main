
const express = require("express");
const router = express.Router();

const { register, login,logout, forgotPassword, resetPassword, addproducts } = require("./userControllers/routinglogic");
const verifyToken=require("./middlewares/verifytoken");


router.post("/register", register);

router.post("/login", login);

router.post('/logout',logout)

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/addproducts",verifyToken, addproducts);



module.exports = router;
