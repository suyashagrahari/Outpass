
// const Registration = require("../models/registration");
const jwt = require("jsonwebtoken");
const StudentRegistration = require("../models/StudentSchema");
const FacultyRegistration = require("../models/FacultySchema");

// const Authenticate = async(req,res,next)=>{
//     // console.log(req); 
//     try {
//         console.log("hello suyash niche mera token h!");
//         const token = req.cookies.jwt_login;   //login krne pr jwt_login cookies genrate hua, usme hamra kaun sa token h wo find krta h ye -> token return krega 
//         console.log("Ye mera Token h jo : - ", token)
//         console.log("ye mera secrete key h :- ", process.env.SECRET_KEY);
//         const verifyToken = jwt.verify(token,process.env.SECRET_KEY); // ye virify krega jo hmare Db m login krne pr jo token store hua tha kya us token ka secret key aur is token ka secret key match kr rha h.
//         console.log(verifyToken); // -> ye hme pure us token ki jankari dedega mtlb pura user dedega 

        
//         const rootUserFaculty = await FacultyRegistration.findOne({_id: verifyToken._id , "tokens.token":token})
//         const rootUserStudent = await StudentRegistration.findOne({_id: verifyToken._id , "tokens.token":token})
        
        
//         console.log("ye hme user print krega :- " , rootUserFaculty);
//         console.log("ye hme user print krega :- " , rootUserStudent);

//         if(!rootUser){
//             return res.status(400).json({
//                 error: "Token is not provided",
//                 user : rootUser
//             })
//         }

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userId = rootUser._id;
//         next();
//     } catch (error) {
//         res.status(400).json({"error" : "No token provided!"});
//         console.log(error);
//     }
// }


// module.exports = Authenticate;


// const jwt = require('jsonwebtoken');
// const FacultyRegistration = require('../models/FacultyRegistration'); // Assuming you have these models imported
// const StudentRegistration = require('../models/StudentRegistration');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            throw new Error("No token provided");
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the token belongs to a faculty
        const rootUserFaculty = await FacultyRegistration.findOne({
            _id: decodedToken._id,
            "tokens.token": token
        });

        // Check if the token belongs to a student
        const rootUserStudent = await StudentRegistration.findOne({
            _id: decodedToken._id,
            "tokens.token": token
        });

        if (rootUserFaculty) {
            req.token = token;
            req.rootUser = rootUserFaculty;
            req.userId = rootUserFaculty._id;
        } else if (rootUserStudent) {
            req.token = token;
            req.rootUser = rootUserStudent;
            req.userId = rootUserStudent._id;
        } else {
            throw new Error("User not found");
        }

        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = Authenticate;
