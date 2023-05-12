const morgan = require('morgan');
const fs = require("fs");
const express = require('express');
const mongoose = require('mongoose');
const home = require("./models/home");
const short = require("./models/short");
const cine = require("./models/cinematics");
const vfx = require("./models/vfx");
const doc = require("./models/doc");
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
    res.send(data);
});

app.post("/login", (req, res) => {
    if (req.body.user === "jlalo01" && req.body.pass === "Thepass"){res.json({stat:"approved"});}
    else{res.json({stat:"denied"});}
});

app.post("/short", (req, res) => {
    const data = require("./data/shorts.json");
    if (req.body.id in data){
        res.json({stat:"rep"});
    }
    else if (req.body.id.includes(" ")){res.json({stat:"space"});}
    else if (req.body.date.includes("undefined")){res.json({stat:"fd"});}
    else{
        let n = {};
        n[req.body.id] = {
            link: req.body.link,
            name: req.body.name,
            date: req.body.date,
            cast: req.body.cast,
            synopsis: req.body.synopsis,
            writer: req.body.writer,
            director: req.body.director,
            editor: req.body.editor,
            camera: req.body.camera,
            audio: req.body.audio
        }
        let ids = [];
        for (let id in data){ids.push(id);}
        ids.forEach(element => {
            n[element] = data[element];
        });
        const fin = JSON.stringify(n);
        fs.writeFile('./data/shorts.json', fin, function(err){console.log(err);});
        res.json({stat:"approved"});
    }
});

app.post("/homes", (req, res) => {
    if (req.body.name === "" || req.body.link === ""){res.json({stat:"miss"});}
    else{
        fs.writeFile('./data/home.json', JSON.stringify(req.body), function(err){console.log(err);});
        res.json({stat:"approved"});  
    }
});

app.post("/cine", (req, res) => {
    const data = require("./data/cinematics.json");
    if (req.body.id in data){
        res.json({stat:"rep"});
    }
    else if (req.body.id.includes(" ")){res.json({stat:"space"});}
    else{
        let n = {};
        n[req.body.id] = {
            link: req.body.link,
            name: req.body.name,
            info: req.body.info,
            camera: req.body.camera,
            lense: req.body.lense
        }
        let ids = [];
        for (let id in data){ids.push(id);}
        ids.forEach(element => {
            n[element] = data[element];
        });
        const fin = JSON.stringify(n);
        fs.writeFile('./data/cinematics.json', fin, function(err){console.log(err);});
        res.json({stat:"approved"});
    }
});

app.post("/docs", (req, res) => {
    const data = require("./data/docs.json");
    if (req.body.id in data){
        res.json({stat:"rep"});
    }
    else if (req.body.id.includes(" ")){res.json({stat:"space"});}
    else{
        let n = {};
        n[req.body.id] = {
            link: req.body.link,
            name: req.body.name,
            info: req.body.info,
        }
        let ids = [];
        for (let id in data){ids.push(id);}
        ids.forEach(element => {
            n[element] = data[element];
        });
        const fin = JSON.stringify(n);
        fs.writeFile('./data/docs.json', fin, function(err){console.log(err);});
        res.json({stat:"approved"});
    }
});

app.post("/vfx", (req, res) => {
    const data = require("./data/vfx.json");
    if (req.body.id in data){
        res.json({stat:"rep"});
    }
    else if (req.body.id.includes(" ")){res.json({stat:"space"});}
    else if (req.body.tags.includes(" ")){res.json({stat:"tspace"});}
    else{
        const t = req.body.tags.split("/");
        let n = {};
        n[req.body.id] = {
            link: req.body.link,
            name: req.body.name,
            info: req.body.info,
            tags: t
        };
        let ids = [];
        for (let id in data){ids.push(id);}
        ids.forEach(element => {
            n[element] = data[element];
        });
        const fin = JSON.stringify(n);
        fs.writeFile('./data/vfx.json', fin, function(err){console.log(err);});
        res.json({stat:"approved"});
    }
});


module.exports = app;