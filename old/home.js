const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    link:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
 });

const home = mongoose.model("home", homeSchema)
module.exports = home;