const mongoose = require("mongoose");

const ContactSchema  =  new mongoose.Schema({
    name:{
        type : String,
        required : true,
        lowercase: true,
    },
    email : {
        type : String,
        required : true,
        lowercase: true,
    },
    message :{
        type : String,
        required : true,
    }
})

const ContactRegistration = mongoose.model("ContactRegistration",ContactSchema);
module.exports = ContactRegistration;