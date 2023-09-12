const morgan = require('morgan');
const fs = require("fs");
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const prog = require("./models/program");
const user = require("./models/user");
const video = require("./models/video");
const slide = require("./models/slide");
const photo = require("./models/photo");
const category = require("./models/category");
const { clearLine } = require('readline');
const app = express();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect("mongodb+srv://joeylalo13:qwased@cluster0.7h70lf4.mongodb.net/?retryWrites=true&w=majority")
  .then((data) => console.log(`Connected to MongoDB`))
  .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.urlencoded({ extended: true }));


//Send a video found by it's tag set in the parameters
app.get("/video/tag/:theTag", async (req, res) => {
    const data = await video.find({tag:req.params.theTag});
    res.json(data);
});

//Send all the categories in random order
app.get("/categories/random", async (req, res) => {
    const data = await category.find({});
    data.forEach((on, i)=>{
        let flip = Math.floor(Math.random()*i);
        data[i] = data[flip]
        data[flip] = on;
    });
    res.json(data);
});

//Send all the categories in order of creation
app.get("/categories", async (req, res) => {
    const data = await category.find({});
    res.json(data);
});

//Send all the videos that fit a specific category set in the parameters
app.get("/video/cat/:theCat", async (req, res) => {
    const data = await video.find({category:req.params.theCat});
    res.json(data);
});

app.get("/video/ord-cat/:theCat", async (req, res) => {
    const data = await video.find({category:req.params.theCat});
    data.sort((a, b) => {
        return b.createdAt - a.createdAt;
    });
    res.json(data);
});

//Send the Slides information
app.get("/slides", async (req, res)=> {
    const data = await slide.find({});
    res.json(data);
});

app.get("/prog", async (req, res) =>{
    const data = await prog.find({}).exec();
    res.json(data)
});



app.post("/up-prog", async (req, res) => {
    const data = req.body;
    const u = await user.findOne({user:"jlalo"});
    if (await bcrypt.compare(data.pass, u.pass)){
        delete data["pass"];
        try{
            prog.create(data);
        } catch(err){
            console.log(err);
            res.send(false);
        } finally{
            res.send(true);
        }
    }
    else{res.send(false);}
});

module.exports = app;