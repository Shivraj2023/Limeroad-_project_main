const nodemailer=require("nodemailer");

const env=require("dotenv");
env.config();

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.USER,
        pass:process.env.PASSWORD,
    }
    
})
console.log(process.env.USER);

module.exports=transporter;
