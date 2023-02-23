const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadRecently = new Schema({
    email: String,
    img: String,
    name: String,
    author: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

const readRecently = mongoose.model('ReadRecently', ReadRecently);

module.exports = readRecently;