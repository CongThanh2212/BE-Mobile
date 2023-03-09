const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: String,
    link: String
})

const category = mongoose.model('Category', Category);

module.exports = category;