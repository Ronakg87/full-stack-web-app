const mongoose = require("mongoose");

const product = mongoose.Schema({
    product_name:{
        type:String,
        required: true
    },
    sku:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true,
    }
    // image:{
    //     type:String,
    //     required:true
    // },

},{timestamps:true});

module.exports = mongoose.model("Product", product);