const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    img: String,
    name: String,
    author: String,
    description: String,
    type: String,
    numberOfRead: {
        type: Number,
        default: 0
    },
    language: String,
    pdf: String
})

const book = mongoose.model('Book', Book);

module.exports = book;