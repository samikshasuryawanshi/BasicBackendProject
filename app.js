const express = require('express');
const app = express()
const path=require('path')
const userModel=require("./models/user-models")


app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.render("index")
})

app.get("/Users",(req,res)=>{
    userModel.find().then(function(users){
        res.render("users",{users})
    })
})

app.post("/register",function(req,res){
     let {name,email,username,password} = req.body
    userModel
    .create({
        name,
        email,
        username,
        password
    })
    .then(function(value){
        res.redirect("/Users")
    })
})

app.get("/update/:id",(req,res)=>{
    userModel.findOneAndUpdate({_id:req.params.id}).then((user)=>{
        res.render("update",{user})
    })
})

app.post("/update/:id",(req,res)=>{
    let {name,email,username} =req.body;
    userModel.findOneAndUpdate({_id:req.params.id},{name,email,username},{new:true}).then((user)=>{
        res.redirect("/Users")
    })
})

app.get("/delete/:id",(req,res)=>{
    userModel.findOneAndDelete({_id:req.params.id}).then(function(users){
        res.redirect("/Users")
    })
})

app.listen(3000)