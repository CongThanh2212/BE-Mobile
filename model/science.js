const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Science = new Schema({
    img: String,
    name: String,
    author: String
})

const science = mongoose.model('Science', Science);

module.exports = science;