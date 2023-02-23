const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Verification = new Schema({
    email: String,
    otp: String
})

const verification = mongoose.model('Verification', Verification);

module.exports = verification;