const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docSchema = new Schema({
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
    }
 });

const doc = mongoose.model("doc", docSchema)
module.exports = doc;