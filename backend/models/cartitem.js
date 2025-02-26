const mongoose=require("mongoose");
const Customer = require("./customer");
const Product = require("./products");

const cartitemsschema= new mongoose.Schema({
    customerId:{type:String,ref:Customer,required:true},
    cartItems:[
        {
        productId:{type:String,ref:Product,required:true},
        productQuantity:{type:Number,required:true}
    }
]
})

const CartItem= mongoose.model("CartItem",cartitemsschema);

module.exports=CartItem;