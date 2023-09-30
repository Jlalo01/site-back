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


//Send all Videos
app.get("/videos", async (req, res) => {
    const data = await video.find({});
    res.json(data);
});

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

//Send the data for a specific category
app.get("/category/:theCat", async (req, res) => {
    const data = await category.find({name:req.params.theCat});
    res.json(data);
});

//Send all the videos that fit a specific category set in the parameters
app.get("/video/cat/:theCat", async (req, res) => {
    const data = await video.find({category:req.params.theCat});
    res.json(data);
});

//Send all the videos that fit a specific category set in parameters in order, newest at 0 index
app.get("/video/ord-cat/:theCat", async (req, res) => {
    const data = await video.find({category:req.params.theCat});
    data.sort((a, b) => {
        return b.createdAt - a.createdAt;
    });
    res.json(data);
});

//Send all Photos
app.get("/photos", async (req, res) =>{
    const data = await photo.find();
    res.json(data);
});

//Send all Photos in order, newest at 0 index
app.get("/photos-ord", async (req, res) => {
    const data = await photo.find({});
    data.sort((a, b) =>{
        return b.createdAt - a.createdAt;
    });
    res.json(data);
});

//Send Photo found by tag
app.get("/photos/tag/:theTag", async (req, res) => {
    const data = await photo.find({tag:req.params.theTag});
    res.json(data);
});

//Send the Slides information
app.get("/slides", async (req, res)=> {
    const data = await slide.find({});
    res.json(data);
});

//Send the Programming projects 
app.get("/prog", async (req, res) =>{
    const data = await prog.find({}).exec();
    res.json(data)
});


//Add or create to a new category
app.post("/up-category", async (req, res) => {
    const data = req.body;
    const c = await category.find({name:data[1].name});
    try{
        if (c.length === 0){await category.create(data[1]);}
        else {await category.findOneAndReplace(data[0], data[1]);}
    } catch(err){
        res.send(false);
    } finally{
        res.send(true);
    }
});

//Create a new Programming entry
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

//Add a vieo object
app.post("/up-video", (req, res) => {
    const data = req.body;
    try{
        video.create(data);
    } catch{
        console.log(err);
        res.send(false);
    } finally{
        res.send(true);
    }
});

//Add a foto object
app.post("/up-photo", async (req, res) => {
    const data = req.body;
    try{photo.create(data);}
    catch{res.send(false);}
    finally{res.send(true);}
});

//Delete a video by it's tag
app.post("/del-video/tag", async (req, res) => {
    const data = req.body[0];
    try{await video.deleteOne({tag:data});}
    catch{res.send(false);}
    finally{res.send(true);}
});

//Delete a Photo by it's tag
app.post("/del-photo/tag", async (req, res) => {
    const data = req.body[0];
    try{await photo.deleteOne({tag:data});}
    catch{res.send(false);}
    finally{res.send(true);}
});

//Add a Video to the Slide 
app.post("/up-slide", async (req, res) => {
    const data = req.body;
    try{slide.create(data);}
    catch{res.send(false);}
    finally{res.send(true);}
});

//Delete Video from Slide by its tag
app.post("/del-slide/tag", async (req, res) => {
    const data = req.body[0];
    try{await slide.deleteOne({tag:data});}
    catch{res.send(false);}
    finally{res.send(true);}
});

//Delete an item from Category
app.post("/del-category", async (req, res) => {
    const data = req.body[0];
    try{
        const c = await category.findOne({name:data});
        if (c.count === 1){await category.deleteOne({name:data});}
        else {await category.updateOne({name:data}, {count:c.count-1});}
    } catch{res.send(false);} finally{res.send(true);}
});

module.exports = app;