const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequireCreate = new Schema({
    email: String,
    password: String,
    name: String,
    otp: String
})

const requireCreate = mongoose.model('RequireCreate', RequireCreate);

module.exports = requireCreate;