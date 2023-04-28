const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Collection = new Schema({
    email: String,
    img: String,
    name: String,
    author: String
})

const collection = mongoose.model('Collection', Collection);

module.exports = collection;