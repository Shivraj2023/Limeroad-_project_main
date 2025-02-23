
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const Customer = require("../models/customer");
const Vendor = require("../models/vendor");
const Admin = require("../models/admin");
const transporter = require("./transporter");

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
  const {email,password} = req.body;
  try {
    let user = await Customer.findOne({email });
    if (!user) {
      user = await Vendor.findOne({email});
    }
    if (!user) {
      user = await Admin.findOne({email});
    }
    if (!user) {
      return res.status(401).json({ message: "You are not registered" });
    }

      const isMatch = await bcrypt.compare(password,user.password);
     
    if(!isMatch){
       return res.status(400).json({message:"invalid crenditials"});
    }

    const payload = {
      id: user._id,
      usertype: user.usertype,
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.cookie("authToken", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", usertype: user.usertype,name:user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout=async(req,res)=>{
   res.cookie("authToken",'',{expires:new Date(0),httpOnly:true})
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

module.exports = { register, login,logout, forgotPassword, resetPassword };
