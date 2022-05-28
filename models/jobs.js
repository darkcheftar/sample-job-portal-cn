const mongoose = require('mongoose');
const User  = require('./users');
const jobSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    postedBy:{
        type:User,
        required:true
    },
    description:{
        type:String
    },
    postDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    skills:{
        type:[String],
    }
});

module.exports = mongoose.model('Job', jobSchema);