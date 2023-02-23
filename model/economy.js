const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Economy = new Schema({
    img: String,
    name: String,
    author: String
})

const economy = mongoose.model('Economy', Economy);

module.exports = economy;