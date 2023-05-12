const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cineSchema = new Schema({
    link:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: false
    },
    camera:{
        type: String,
        required: true
    },
    lense:{
        type: String,
        required: true
    }
 });

const cine = mongoose.model("cine", cineSchema)
module.exports = cine;