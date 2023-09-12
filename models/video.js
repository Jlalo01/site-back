const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    tag:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true
    },
    specs:{
        type: Object,
        required: true
    }
}, {timestamps: true});

const video = mongoose.model("video", videoSchema);
module.exports = video;