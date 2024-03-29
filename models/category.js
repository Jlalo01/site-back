const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        required: true
    }
});

const category = mongoose.model("category", categorySchema);
module.exports = category;