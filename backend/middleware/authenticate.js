
// const Registration = require("../models/registration");
const jwt = require("jsonwebtoken");
const StudentRegistration = require("../models/StudentSchema");
const FacultyRegistration = require("../models/FacultySchema");

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
