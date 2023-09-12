const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = new Schema({
    tag:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, {timestamps: true});

const slide = mongoose.model("slide", slideSchema);
module.exports = slide;