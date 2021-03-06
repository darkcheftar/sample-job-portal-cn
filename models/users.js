const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    joiningDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    skills:{
        type:[String]
    }
});

module.exports = mongoose.model('User', userSchema);