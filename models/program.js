const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    langs:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: false
    },
    links:{
        type: Array,
        required: false
    },
 });

const prog = mongoose.model("prog", progSchema)
module.exports = prog;