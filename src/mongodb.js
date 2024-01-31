const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.DB;

// mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")
mongoose.connect(db, { useNewUrlParser: true })
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((e)=>{
    console.log("Error connecting to MongoDB:", e)
})

const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Collection = mongoose.model("Collection", LogInSchema);
module.exports = Collection;
