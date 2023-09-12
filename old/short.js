const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortSchema = new Schema({
    tag:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: false
    },
    cast:{
        type: String,
        required: true
    },
    synopsis:{
        type: String,
        required: true
    },
    writer:{
        type: String,
        required: false
    },
    director:{
        type: String,
        required: true
    },
    editor:{
        type: String,
        required: true
    },
    camera:{
        type: String,
        required: false
    },
    audio:{
        type: String,
        required: true
    }
 });

const short = mongoose.model("short", shortSchema)
module.exports = short;