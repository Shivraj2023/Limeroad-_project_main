const express=require("express");
require("dotenv").config();
const stripe=require("stripe")(process.env.STRIPE_SCERET_KEY);

const Customer= require("../models/customer");
const Order=require('../models/orders');
const Product = require('../models/products');
const CartItem=require('../models/cartitem')

const payment= async (req, res) => {
    try {
        const userId=req.user&&req.user.id;
        const { cart,address} = req.body; 
       
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }
        const updatedUser = await Customer.findByIdAndUpdate(userId, { $set: { address } }, { new: true, runValidators: true });

        console.log("Updated User:", updatedUser);
        

        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title, 
                    
                },
                unit_amount: parseInt(item.price) * 100, 
            },
            quantity: item.quantity, 
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems, 
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:3000/failure',
            metadata: { userId } 
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
}

const process_payment = async (req, res) => {
    try {

        const customerId = req.user?.id;
        let { cart,sessionId } = req.body;
          cart=JSON.parse(cart);
        console.log("cartitems-----",cart);
        console.log("Processing order for user:", customerId);

        console.log("Received cart:", cart, "Type:", typeof cart);


        
        const user = await Customer.findById(customerId);
        if (!user) return res.status(404).json({ message: "User not found" });

        
        const newOrder = new Order({
            customerId,
            items: cart.map(item => ({
                productId: item.id, 
                title: item.title,
                quantity: item.quantity,
            })),
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0), 
            status: 'Paid'
        });
        
        await newOrder.save();

        // Clear cart
        await CartItem.findOneAndDelete({ customerId });
        
        for (let item of cart) {
            const product = await Product.findById(item.id); 
        
            if (product) {
                const orderedStock = (parseInt(product.orderedStock) || 0) + item.quantity;
                const availableStock = (parseInt(product.totalstock) || 0) - orderedStock;
        
                await Product.findByIdAndUpdate(item._id, { 
                    orderedStock: orderedStock.toString(),
                    availablestock: availableStock.toString(),
                });
            }
        }
        
        console.log("Order stored, cart cleared, stock updated.");
        res.status(200).json({ success: true });

    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ error: error.message });
    }
};



module.exports={payment,process_payment};
