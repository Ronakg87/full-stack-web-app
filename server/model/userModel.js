const mongoose = require("mongoose");

const user = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    }
    // image:{
    //     type:String,
    //     required:true
    // },

},{timestamps:true});


module.exports = mongoose.model("User", user);