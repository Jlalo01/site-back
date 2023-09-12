const morgan = require('morgan');
const fs = require("fs");
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const home = require("./models/home");
const short = require("./models/short");
const cine = require("./models/cinematics");
const vfx = require("./models/vfx");
const doc = require("./models/doc");
const prog = require("./models/program");
const user = require("./models/user");
const app = express();


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


app.get('/shorts', async (req, res) => {
    const data = await short.find({}).exec();
    data.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
    });
    res.json(data);
});

app.get('/shorts/:short', async (req, res) => {
    const data = await short.find({tag:req.params.short}).exec();
    res.json(data);
});

app.get('/home', async (req, res) => {
    const data = await home.find({}).exec();
    res.json(data);
});

app.get('/cine', async (req, res) => {
    const data = await cine.find({}).exec();
    res.json(data);
});

app.get('/docs', async (req, res) => {
    const data = await doc.find({}).exec();
    res.json(data);
});

app.get('/vfx', async (req, res) => {
    const data = await vfx.find({}).exec();
    res.json(data);
});

app.get("/prog", async (req, res) =>{
    const data = await prog.find({}).exec();
    res.json(data)
});

app.post("/up-home", async (req, res) =>{
    const data = req.body;
    const u = await user.findOne({user:"jlalo"});
    if (await bcrypt.compare(data.pass, u.pass)){
        await home.deleteMany({});
        delete data["pass"];
        try{
            home.create({
                link:data.link,
                name:data.name
            });
        } catch(err){
            console.log(err);
            res.send(false);
        } finally{
            res.send(true);
        }
    }
    else{res.send(false);}
});

app.post("/up-short", async (req, res) =>{
    const data = req.body;
    const u = await user.findOne({user:"jlalo"});
    if (await bcrypt.compare(data.pass, u.pass)){
        delete data["pass"];
        try{
            short.create(data);
        } catch(err){
            console.log(err);
            res.send(false);
        } finally{
            res.send(true)
        }
    }
    else{res.send(false);}

})

app.post("/up-cine", async (req, res) => {
    const data = req.body;
    const u = await user.findOne({user:"jlalo"});
    if (await bcrypt.compare(data.pass, u.pass)){
        delete data["pass"];
        try{
            cine.create(data);
        } catch(err){
            console.log(err);
            res.send(false);
        } finally{
            res.send(true);
        }
    }
    else{res.send(false);}
});

app.post("/up-docs", async (req, res) => {
    const data = req.body;
    const u = await user.findOne({user:"jlalo"});
    if (await bcrypt.compare(data.pass, u.pass)){
        delete data["pass"];
        try{
            doc.create(data);
        } catch(err){
            console.log(err);
            res.send(false);
        } finally{
            res.send(true);
        }
    }
    else{res.send(false);}
});

app.post("/up-vfx", async (req, res) => {
    const data = req.body;
    const u = await user.findOne({user:"jlalo"});
    if (await bcrypt.compare(data.pass, u.pass)){
        delete data["pass"];
        try{
            vfx.create(data);
        } catch(err){
            console.log(err);
            res.send(false);
        } finally{
            res.send(true);
        }
    }
    else{res.send(false);}
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