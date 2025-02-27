
const mongoose=require("mongoose");

const customerSchema=new mongoose.Schema ({
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
  },userIP:{
    type:String,
    default:null
  }
})

const Customer=mongoose.model("customer",customerSchema);



module.exports= Customer;