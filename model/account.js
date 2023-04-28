const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: String,
    password: String,
    name: String
})

const account = mongoose.model('Account', Account);

module.exports = account;