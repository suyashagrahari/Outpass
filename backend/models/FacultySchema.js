const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const FacultySchema = new mongoose.Schema({
        user :{
            type : String,
            required : true,
        },
        name:{
            type:String,
            // required : true,
            lowercase:true
        },
        email:{
            type: String,
            // required: true,
            // unique : true,
            lowercase: true,
           
        },
        password : {
            type: String,
        },
        confirmpassword : {
            type: String,

        },
        phone:{
            type: String,
            minlength: 10, // Minimum length of 10 characters
            maxlength: 10, // Maximum length of 10 characters
        },
 
        
        tokens : [{
            token : {
                type : String,
            }
        }]
})


FacultySchema.methods.generateAuthToken = async function(){
    try {
        // const token = await jwt.sign({_id : this._id},"secretkey" ,{
            // expiresIn: "2 hours"
        // })  //ynha pr hm expiry bhi daal skte h ki itne time naad hamara token expire ho jayega

        const token = await jwt.sign({_id : this._id},process.env.SECRET_KEY);
        console.log(token);
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        console.log("token save hogya");
        return token;

        
    } catch (error) {
        console.log(error);
        
    }
}

const FacultyRegistration = mongoose.model("FacultyRegistration",FacultySchema);
module.exports = FacultyRegistration;