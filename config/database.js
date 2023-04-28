const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://genz2015:22122001Thanh@clustervct.hdfewfw.mongodb.net/Mobile');
        console.log("Connect to db successfully")
    } catch (error) {
        console.log("Connect to db fail")
    }
}

module.exports = { connect }