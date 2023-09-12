const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    tag:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true
    }
}, {timestamps: true});

const photo = mongoose.model("photo", photoSchema);
module.exports = photo;