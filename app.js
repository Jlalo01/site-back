const morgan = require('morgan');
const fs = require("fs");
const express = require('express');
const app = express();


app.use(morgan('dev'));
app.use(express.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.urlencoded({ extended: true }));


app.get('/shorts', (req, res) => {
    const data = require('./data/shorts.json');
    res.json(data);
});

app.get('/shorts/:short', (req, res) => {
    const data = require('./data/shorts.json');
    res.json(data[req.params.short]);
});

app.get('/home', (req, res) => {
    const data = require('./data/home.json');
    res.json(data);
});

app.get('/cine', (req, res) => {
    const data = require('./data/cinematics.json');
    res.json(data);
});

app.get('/docs', (req, res) => {
    const data = require('./data/docs.json');
    res.json(data);
});

app.get('/vfx', (req, res) => {
    const data = require('./data/vfx.json');
    res.json(data);
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