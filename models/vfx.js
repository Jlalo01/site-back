const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vfxSchema = new Schema({
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
    tags:{
        type: Array,
        required: true
    }
 });

const vfx = mongoose.model("vfx", vfxSchema)
module.exports = vfx;