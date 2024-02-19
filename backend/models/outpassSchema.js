const validator = require("validator")
const mongoose = require("mongoose")



// ****************************** STUDENT SCHEMA ****************************
const outpassSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,  // Use ObjectId type for the _id field
        // default: mongoose.Types.ObjectId,     // Generate a new ObjectId by default
    },
    email:{
        type: String,
        lowercase: true,
        unique:true,
    },
    name:{
        type:String,
        // required : true,
        lowercase:true
    },
    rollno:{
        type: String,
        lowercase:true,
    },
    
    phone:{
        type: String,
    },
    visitpurpose:{
        type : String,
        },
    mode:{
        type:String,
        },
    time:{
        type:String,
        },
    date:{
        type:Date,
        },
    status : {
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const OutpassModel = mongoose.model("OutpassModel",outpassSchema);

module.exports = OutpassModel;
