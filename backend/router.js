const express=require("express");
const router=  express.Router();
const Customer=require("./models/customer")


router.post('/register', async(req,res)=>{
    const {name,email,phone_number,password}=req.body;
   try{
    const customer=new Customer({name,email,phone_number,password});
    await customer.save();
    res.status(200).json({message:"registred succesful"})
   }  
   catch (error){
    res.status(400).json({message:"error while registering"})
   }
})


router.post('/login',async(req,res)=>{

    const {phone_number,email}=req.body;
    console.log(req.body);
   
    try{
     const customer=  await Customer.findOne({phone_number:phone_number,email:email});

     if(!customer){
        return res.status(401).json({message:"you are not registerd"})
     }
     res.status(200).json({message:"login succesfull"})

    } catch(error){
     res.status(500).json({message:"server error"})
    }

})






module.exports=router;


















































/* 
router.post('/register', (req, res) => {
    const { name, email, phone_number, password, usertype } = req.body;
    console.log(req.body);

    let tablename;
    if (usertype === 'customer') {
        tablename = "customer";
    } 
    else if (usertype === 'vendor') {
        tablename = "vendor";
    } else if 
    (usertype === 'admin') {
        tablename = "admin";
    }
     else {
        return res.status(400).json({ error: "Invalid user type" });
    }

    const query = `INSERT INTO ${tablename} (name, email, phone_number, password) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [name, email, phone_number, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: `${usertype} registered successfully` });
       });
    }
)

  


router.post('/login',(req,res)=>{
    const {phone_number,email,usertype}=req.body;
    console.log(req.body);

    let tablename;
    if (usertype === 'customer') {
        tablename = "customer";
    } 
    else if (usertype === 'vendor') {
        tablename = "vendor";
    } else if 
    (usertype === 'admin') {
        tablename = "admin";
    }
     else {
        return res.status(400).json({ error: "Invalid user type" });
    }
   const query = `SELECT * FROM ${tablename} WHERE phone_number = ? AND email = ?`;


    db.query(query,[phone_number,email], (error,results)=>{

        if(error){
            console.error("SQL Error:", error);
            return res.status(400).json({message:"invalid crendtials"})
        } 
         if(results&&results.length>0){
            return res.status(200).json({meassage:"login succesfull"})
         } else{
            return res.status(401).json({ message: "Invalid credentials" });
         }
    })

})

module.exports=router; */