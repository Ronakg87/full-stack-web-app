const mongoose = require("mongoose");

const product = mongoose.Schema({
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref: "User"
    // },
    name:{
        type:String,
        required: true
    },
    sku:{
        type:String,
        unique: true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    source:{
        type:String,
        enum: ['admin', 'user'],
        required:true,
    },
    assignedTo: [{ type: String }]


    // name: String,
    // sku: { type: String, unique: true },
    // description: String,
    // category: String,
    // logo: String,  // Image path
    // source: { type: String, enum: ['admin', 'user'] },
    // assignedTo: [{ type: String }]

},{timestamps:true});

module.exports = mongoose.model("Product", product);