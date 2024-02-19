const mongoose  = require("mongoose");
const dbLink = process.env.MONGODB_URL;

const connection = async()=>{
    try {
        await mongoose.connect(dbLink);
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
}


connection();



