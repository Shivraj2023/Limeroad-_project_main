
const express = require("express");
const router = express.Router();

const { register, login,logout, forgotPassword, resetPassword, addproducts,products,vendorProducts,Cart } = require("./userControllers/routinglogic");
const verifyToken=require("./middlewares/verifytoken");
const upload=require("./userControllers/multersetup");


router.post("/register", register);

router.post("/login", login);

router.post('/logout',logout)

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/addproducts",verifyToken, upload.fields([{name:"brand_image",maxCount:1},{name:"image",maxCount:1}]) ,addproducts);

router.get("/products",products);

router.get("/vendorProducts",verifyToken,vendorProducts);

router.post("/cartproducts",verifyToken,Cart);



module.exports = router;
