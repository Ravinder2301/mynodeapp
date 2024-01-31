const dotenv = require('dotenv');
dotenv.config();
const express = require("express")
const app = express();
const path = require("path")
const hbs = require("hbs");
const collection = require("./src/mongodb")
const templatePath = path.join(__dirname,'./templates')
// app.use(express.static(__dirname + '/public'));
app.use(express.static('.'));


app.use(express.json())
app.set("view engine", "hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup", async(req,res)=>{
    console.log("signup")
    const name = req.body.name;
    const password = req.body.password;

    // Continue with data insertion
    const data = {
        name: name,
        password: password
    };

    try {
        const check1 = await collection.findOne({name:req.body.name})
        if(check1){
            res.send("Already exist")
        }
        else{
            await collection.insertMany([data], { maxTimeMS: 30000 });
            console.log("Data inserted successfully");
            res.render("home");
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("An error occurred while registering.");
    }
})

app.post("/login", async (req,res)=>{

    if (!req.body.name || !req.body.password) {
        return res.render('login', { errorMessage: 'Please enter both username and password.' });
    }

    try{
        const check = await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.render("error")
        }
    }
    catch{
        res.render("error")
    }

})

app.listen(process.env.PORT, () => console.log("app is running"));