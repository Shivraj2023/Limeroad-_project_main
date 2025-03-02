
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
  },
  address: {
    pincode: { type: String, default: "", trim: true },
    mobileNumber: { type: String, default: "", trim: true },
    fullName: { type: String, default: "", trim: true },
    locality: { type: String, default: "", trim: true },
    houseNumber: { type: String, default: "", trim: true },
    landmark: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    state: { type: String, default: "", trim: true },
    addressType: { type: String, default: "home", enum: ["home", "office"] }
  }
})

const Customer=mongoose.model("customer",customerSchema);



module.exports= Customer;