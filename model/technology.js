const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Technology = new Schema({
    img: String,
    name: String,
    author: String
})

const technology = mongoose.model('Technology', Technology);

module.exports = technology;