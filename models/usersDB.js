const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = new Schema({
    Name:{
        type: String,
        required: true        
    },
    Phone: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique:true,
    },
    Password: {
        type: String,
        required: true,
        unique:true
    }
})
module.exports = mongoose.model('User',User)