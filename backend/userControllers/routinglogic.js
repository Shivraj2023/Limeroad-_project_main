
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const Customer = require("../models/customer");
const Vendor = require("../models/vendor");
const Admin = require("../models/admin");
const Product =require("../models/products");
const transporter = require("./transporter");
const verifyToken=require("../middlewares/verifytoken");

const register = async (req, res) => {
  const { name, email, phone_number, password, usertype } = req.body;
  
  try {
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    if (usertype === "customer") {
      const customer = new Customer({ name, email, phone_number, password: hashedPassword, usertype });
      await customer.save();
      return res.status(200).json({ message: "Registered successfully" });
    } else if (usertype === "vendor") {
      const vendor = new Vendor({ name, email, phone_number, password: hashedPassword, usertype });
      await vendor.save();
      return res.status(200).json({ message: "Registered successfully" });
    } else if (usertype === "admin") {
      const admin = new Admin({ name, email, phone_number, password: hashedPassword, usertype });
      await admin.save();
      return res.status(200).json({ message: "Registered successfully" });
    } else {
      return res.status(400).json({ error: "Invalid usertype" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error while registering", error: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Customer.findOne({ email });
    if (!user) {
      user = await Vendor.findOne({ email });
    }
    if (!user) {
      user = await Admin.findOne({ email });
    }
    if (!user) {
      return res.status(401).json({ message: "You are not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      usertype: user.usertype,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    
    res.status(200).json({ 
      message: "Login successful", 
      usertype: user.usertype, 
      name: user.name,
      token: token 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await Customer.findOne({ email });
    if (!user) {
      user = await Vendor.findOne({ email });
    }
    if (!user) {
      user = await Admin.findOne({ email });
    }
    if (!user) {
      return res.status(401).json({ message: "You are not registered" });
    }
    const payload = { email: user.email };
    const resetToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const mailoptions = {
      from: process.env.USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 10 minutes.</p>`,
    };

    transporter.sendMail(mailoptions, (mailerr, info) => {
      if (mailerr) {
        console.error("Error sending email:", mailerr);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log(`Password reset request email sent to: ${email}`);
      res.status(200).json({ message: "Password reset email sent!", resetToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password,resetpassToken } = req.body;
  console.log("enetred email=====",email);
  console.log("resetpasstoken======",resetpassToken);
  try {
    const payloademail=jwt.verify(resetpassToken,process.env.JWT_SECRET);
    console.log("payload email=======",payloademail.email);

    if(payloademail.email!==email) {
      return res.status(401).json({ message: "Invalid token for the provided email" });
    }
    let user = await Customer.findOne({ email });
    if (!user) {
      user = await Vendor.findOne({ email });
    }
    if (!user) {
      user = await Admin.findOne({ email });
    }
    if (!user) {
      return res.status(401).json({ message: "You are not registered" });
    }
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const addproducts = async (req, res) => {
  try {
   
    const vendor_id = req.user && req.user.id;
    if (!vendor_id) {
      return res.status(401).json({ message: "Unauthorized: Vendor ID missing" });
    }
        

        console.log("reqbody===================>",req.body);

       const brandiamgepath=req.files?.brand_image
       ?`/uploaded_images/${req.files.brand_image[0].filename}`
       :req.body.brand_image;
       const imagepath=req.files?.image
       ?`/uploaded_images/${req.files.image[0].filename}`
       :req.body.image;

          let parsedsize=req.body.size;
          if(typeof parsedsize==="string"){
            try {
              parsedsize = JSON.parse(req.body.size);
            } catch (error) {
              console.error("Error parsing size:", error);
          } }

          let parsedReviews = req.body.reviews;
         if (typeof req.body.reviews === "string") {
          try {
             parsedReviews = JSON.parse(req.body.reviews);
          } catch (error) {
             console.error("Error parsing reviews:", error);
         }
     }

   
    const productData = {
      mainCategory: req.body.mainCategory,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      original_price: req.body.original_price,
      offer_percent: req.body.offer_percent,
      brand_name:req.body.brand_name,
      brand_image: brandiamgepath,
      size: parsedsize,
      image: imagepath,
      reviews: {
        ratings:parsedReviews?.ratings,
        count:parsedReviews?.count
      },
      vendorId: vendor_id, 
    };

    
    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json({message:"product added succesfully",product:savedProduct,vendorId:vendor_id});
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({ message: "Error while adding product", error: error.message });
  }
};

  const products=async(req,res)=>{
     try{

      const products= await Product.find({});

      res.status(200).json({products});

     } catch(error){

      res.status(500).json({message:"unable to fetch the products",error:error.message})
     }
  }






module.exports = { register, login,logout, forgotPassword, resetPassword,addproducts,products };
