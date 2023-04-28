const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LifeSkill = new Schema({
    img: String,
    name: String,
    author: String
})

const lifeSkill = mongoose.model('LifeSkill', LifeSkill);

module.exports = lifeSkill;