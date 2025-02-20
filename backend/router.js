const express=require("express");
const router=  express.Router();
const db=require("./db")


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

  
const query="select * from customer where phone_number=?";

router.post('/login',(req,res)=>{
    const {mobile}=req.body;
    console.log(req.body);

    db.query(query,[mobile], (error,results)=>{

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

module.exports=router;