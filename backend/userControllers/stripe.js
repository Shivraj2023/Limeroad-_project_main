const express=require("express");
require("dotenv").config();
const stripe=require("stripe")(process.env.STRIPE_SCERET_KEY);

const Customer= require("../models/customer");

const payment= async (req, res) => {
    try {
        const userId=req.user&&req.user.id;
        const { cart,address} = req.body; 
        console.log("userid=====",userId);
        console.log("userid=====",address);

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
module.exports=payment;
