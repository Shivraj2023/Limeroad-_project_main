
const mongoose=require("mongoose");

const vendorSchema=new mongoose.Schema ({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  phone_number:{
      type:String,
      unique:true,
      required:true,
  },
  password:{
    type:String,
    required:true
  },
  usertype:{
    type:String,
    required:true
  }
})

const Vendor=mongoose.model("vendor",vendorSchema);



module.exports= Vendor;