const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiv_gsb@20",
    database: "limeroad"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err);
    } else {
        console.log("The connection to MySQL is successful!");
    }
});

app.post('/register', (req, res) => {
    const { name, email, phone_number, password, usertype } = req.body;
    console.log(req.body);

    let tablename;
    if (usertype === 'customer') {
        tablename = "customer";
    } else if (usertype === 'vendor') {
        tablename = "vendor";
    } else if (usertype === 'admin') {
        tablename = "admin";
    } else {
        return res.status(400).json({ error: "Invalid user type" });
    }

    const query = `INSERT INTO ${tablename} (name, email, phone_number, password) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [name, email, phone_number, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: `${usertype} registered successfully` });
    });
});

app.listen(5000, () => {
    console.log("The server is running on port 5000");
});

