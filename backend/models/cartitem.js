const mongoose=require("mongoose");
const Customer = require("./customer");
const Product = require("./products");

const cartitemsschema= new mongoose.Schema({
    customerId:{type:String,ref:Customer,required:true},
    cartItems:[
        {
        id:{type:String,ref:Product,required:true},
        title: { type: String, required: true },
       price: { type: Number, required: true },
       image: { type: String, required: true },
       category: { type: String, required: true },
       size: { type: String, required: true },
       quantity: { type: Number, required: true }
    }
]
})

const CartItem= mongoose.model("CartItem",cartitemsschema);

module.exports=CartItem;