
const express = require("express");
const router = express.Router();

const { register, login,logout, forgotPassword, resetPassword, addproducts,products,vendorProducts,Cart,getCartItems } = require("./userControllers/routinglogic");
const verifyToken=require("./middlewares/verifytoken");
const upload=require("./userControllers/multersetup");
const payment = require("./userControllers/stripe");


router.post("/register", register);

router.post("/login", login);

router.post('/logout',verifyToken,logout)

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/addproducts",verifyToken, upload.fields([{name:"brand_image",maxCount:1},{name:"image",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1}]) ,addproducts);

router.get("/products",products);

router.get("/vendorProducts",verifyToken,vendorProducts);

router.post("/addcartproducts", verifyToken,Cart);

router.get("/getcartproducts",verifyToken, getCartItems);

router.post("/payment",verifyToken,payment);

module.exports = router;
