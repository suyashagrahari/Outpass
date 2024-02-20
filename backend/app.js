// const { error } = require("console");
// const bodyParser = require("body-parser")
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 4000;
// const multer = require("multer");
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const validator = require("validator");

const StudentRegistration  = require("./models/StudentSchema");
const FacultyRegistration = require("./models/FacultySchema");
const Authenticate = require("./middleware/authenticate");
const ContactRegistration = require("./models/ContactSchema");
const OutpassModel = require("./models/outpassSchema");
const sendMail  = require("./middleware/sendMail");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());





// Initialize Multer for file uploads
// const upload = multer({
//     storage : multer.diskStorage({
//         destination: function(req,res,cb)
//         {
//             cb(null,"./public/uploads/")  // ynha hmne directory ka name diya h jnha hme file save krna h 
//         },
//         filename:function(req,file,cb)
//         {
//             cb(null,file.fieldname + "-" + Date.now()+".jpg")
//         }
//     })
// }).single("uploadfile");


app.get("/list",Authenticate,async(req,res)=>{
    
    try {
        console.log("hello aashish!");
        console.log(req.rootUser)
        if(req.rootUser.user === "faculty")
        {

            const ValidUserOne = await FacultyRegistration.findOne({_id: req.userId})
            const List  = await OutpassModel.find();
            return res.status(200).json({
                message: "User is Valid",
                user: {
                    ValidUserOne: ValidUserOne,
                    List: List
                }
            });
        }
        if(req.rootUser.user === "student")
        {
            const ValidUserOne = await StudentRegistration.findOne({_id: req.userId})
            return res.status(200).json({
                message : "User is Valid",
                user : ValidUserOne
            })
        }
        // res.status(200).json({
        //     message:"Hello dosto kaise ho",
        //     user : req.rootUser
        // })
    } catch (error) {
        res.status(400).json({
            error:"User is not valid",
            user : req.rootUser
        })
        console.log("ye error show ho rha h")
        console.log(error);
        
    }
})

app.get("/outpass", Authenticate, async (req, res) => {
    try {
        console.log("hello aashish!");
        console.log(req.rootUser)
        if (req.rootUser.user === "faculty") {
            const ValidUserOne = await FacultyRegistration.findOne({ _id: req.userId })
            return res.status(200).json({
                message: "User is Valid",
                user: ValidUserOne
            })
        }
        if (req.rootUser.user === "student") {
            const ValidUserOne = await StudentRegistration.findOne({ _id: req.userId })
            return res.status(200).json({
                message: "User is Valid",
                user: ValidUserOne
            })
        }
        throw new Error("Invalid user type");
    } catch (error) {
        console.error("Error in /outpass route:", error);
        res.status(400).json({
            error: "User is not valid",
            user: req.rootUser
        });
    }
});
// Backend route for logout
app.get("/logout", Authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currEle) => {
            return currEle.token !== req.token;
        });
        await req.rootUser.save();
        res.clearCookie("jwt_login", { path: "/" });
        return res.status(200).json({
            message: "Logout successful!",
            user: req.rootUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
            user: req.rootUser,
        });
    }
});

app.post("/studentregister", async (req, res) => {
    try {
        // Your file processing logic (if any) goes here
        console.log(req.body);
        
        
        // check password are matching or not
        // destructure the payload coming from frontend
        const {name, rollno, email, phone, password, confirmpassword} = req.body;

        const Email = await StudentRegistration.find({'email': email})
        //   console.log((await Email).length === 0);
        if(Email.length){
            return res.status(400).send("Enter Unique Email Id!!");
            }
        else{
            if(!name || !rollno || !email || !phone || !password || !confirmpassword)
        {
            return res.status(400).send("Every field is required");
        }
        if(name.length < 3)
        {
            return res.status(400).send("Name is too short");
        }
        if(!validator.isEmail(email))
        {
            return res.status(400).send("Email is invalid");
        }

        if(phone.length < 10 || phone.length > 10 ){
            return res.status(400).send("phone no is invalid");
        }
    
        if(password !== confirmpassword)
        {
            return res.status(400).send("password are not matching!");
        }
        if(password === confirmpassword)
        {
            
            // bcrypt the password
            const Password = await bcrypt.hash(password,10);
            const Confirmassword = await bcrypt.hash(confirmpassword,10);
            // now creating a new user in our database 
            
            const user = new StudentRegistration
            ({
                    user : "student",
                    name: name,
                    rollno: rollno,
                    email: email,
                    phone: phone,
                    password: Password,
                    confirmpassword: Confirmassword,
             
               
            })

            // generating token and save it in the data base, it will save in the form of array
            const token = await user.generateAuthToken();
            console.log(token);

            // now save the overall data (uncluded with token) in mongodb
            const newUser = await user.save();
            console.log(newUser);
    
            // now creating the cookies and store token in it.
            res.cookie("Student_cookie", token, {
                expires: new Date(Date.now() + 60 * 60 * 1000), // 7 days
                httpOnly: true,
            });

            return res.status(200).send( "Registration is successfull !");
        }
            else{
            return res.status(400).send( "Registration is Unsuccessfull!");
            }

        }
        
       
    } catch (error) {
        res.status(400).send( "Registration is Unsuccessfull!");
        console.log(error);
    }
});




app.post("/facultyregister", async (req, res) => {
    try {
        // Your file processing logic (if any) goes here
        console.log(req.body);
        
        
        // check password are matching or not
        // destructure the payload coming from frontend
        const {name,email, phone, password, confirmpassword} = req.body;

        const Email = await FacultyRegistration.find({'Faculty.email': email })
         
        if(Email.length){
            return res.status(400).send("Enter Unique Email Id!!");
            }
        else{

            if(!name || !email || !phone || !password || !confirmpassword)
        {
            return res.status(400).send("Every field is required");
        }
        if(name.length < 3)
        {
            return res.status(400).send("Name is too short");
        }
        if(!validator.isEmail(email))
        {
            return res.status(400).send("Email is invalid");
        }

        if(phone.length < 10 || phone.length > 10 ){
            return res.status(400).send("phone no is invalid");
        }
    
        if(password !== confirmpassword)
        {
            return res.status(400).send("password are not matching!");
        }
        
        if(password === confirmpassword)
        {
            
            // bcrypt the password
            const Password = await bcrypt.hash(password,10);
            const Confirmassword = await bcrypt.hash(confirmpassword,10);
            // now creating a new user in our database 
            
            const user = new FacultyRegistration
            ({
                    user : "faculty",
                    name: name,
                    email: email,
                    phone: phone,
                    password: Password,
                    confirmpassword: Confirmassword,
           
               
            })
            // generating token and save it in the data base, it will save in the form of array
            const token = await user.generateAuthToken();
            console.log(token);

            // now creating the cookies and store token in it.
            res.cookie("Faculty_cookie", token, {
                expires: new Date(Date.now() + 60 * 60 * 1000), // 7 days
                httpOnly: true,
            });
            // now save the overall data (uncluded with token) in mongodb
            const newUser = await user.save();
            console.log(newUser);
    
            

            return res.status(200).send( "Registration is successfull !");
        }
        else{
            return res.status(400).send( "Registration is Unsuccessfull!");
            }

        }
       
    } catch (error) {
        res.status(400).send( "Registration is Unsuccessfull!");
        console.log(error);
    }
});






app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Every field is required" });
        }

        const Student = await StudentRegistration.findOne({ "email": email });
        const Faculty = await FacultyRegistration.findOne({ "email": email });

        if (Student && Student.email === email) {
            const boolPasword = await bcrypt.compare(password, Student.password);
            if (boolPasword) {
                // generate token 
                const StudentToken = await Student.generateAuthToken();
                // generate cookie and send token to the frontend 
                res.cookie("jwt_login", StudentToken, {
                    expires: new Date(Date.now() + 60 * 60 * 1000), // 7 days
                    httpOnly: true,
                });
                const user = {
                    Student,
                    StudentToken,
                }
                console.log("Ye rha student ka token", StudentToken);
                return res.status(200).json({
                    message: 'Student Login successful',
                    user: user,
                });
            } else {
                return res.status(400).json({
                    error: "Invalid User",
                    user: Student,
                });
            }
        }


        if (Faculty && Faculty.email === email) {
            const boolPasword = await bcrypt.compare(password, Faculty.password);
            if (boolPasword) {
                // generate token 
                const FacultyToken = await Faculty.generateAuthToken();
                // generate cookie and send token to the frontend 
                res.cookie("jwt_login", FacultyToken, {
                    expires: new Date(Date.now() + 60 * 60 * 1000), // 7 days
                    httpOnly: true,

                });
                const user = {
                    Faculty,
                    FacultyToken,
                }
                console.log("Ye rha faculty ka token", FacultyToken);
                return res.status(200).json({
                    message: 'Faculty Login successful',
                    user: user,
                });
            } else {
                return res.status(400).json({
                    error: "Invalid User",
                    user: Faculty,
                });
            }
        }


        return res.status(400).json({ error: "Invalid User" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

  app.post("/contact", async(req,res)=>{
    try {
        const {name, email, message} = req.body;
        if(!name || !email || !message)
        {
            return res.status(400).json({
                error : "Every field required!",
                user : req.body
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                error : "Please enter valid email id!",
                user : req.body
            })
        }
        else{

            const user = await new ContactRegistration({
                name: name,
                email : email,
                message : message
            })
            const newContact = await user.save();
            console.log(newContact);

            res.status(200).json({
                message : "Message sent Successfully!",
                user : newContact
            });
        }
    } catch (error) {
        res.status(400).json({
            error : "Message isn't send!",
        });
        console.log(error);
    }
  })

  app.post("/outpass",async(req,res)=>{
    try {
        console.log("ye rha hmara body" ,req.body);
       const {_id,name,email, rollno, phone, visitpurpose, mode, time, date, status}  = req.body;
       if(!name || !email || !visitpurpose || !mode || !date || !time )
       {
            return res.status(400).json({
                error: "Every field is required!"
            })
       }
       const User = new OutpassModel({
        _id : _id,
        name:name,
        email:email,
        rollno : rollno,
        phone:phone,
        visitpurpose: visitpurpose,
        mode:mode,
        date:date,
        time: time,
        status : status,
       })

       const newUser = await User.save();
       return res.status(200).json({
        message : "Outpass submitted Successfully!",
        user : newUser,
       })

    } catch (error) {
       return res.status(400).json({
                error: "Outpass is not Submitted!"
            })
    }
  })
  
 

  app.post("/list",sendMail,async(req,res)=>{
    try {
        console.log(req.body)
        const {status,studentId} = req.body; 
        
        const User = await OutpassModel.findById(studentId);
        const deleteUser = await OutpassModel.findByIdAndDelete(User._id);
        res.status(200).json({
            message:"mail has sent",
            user : deleteUser
        })
        console.log(deleteUser);
        console.log(User);
    } catch (error) {
        res.status(400).json({
            message :"mail hasn't sent",
            user : deleteUser
        })
        console.log(error);
        
    }
  })
// // ************************************ EXPRESS RUNNING CODE ***********************************
app.listen(port,()=>{
    console.log(`server is connected at ${port}`);
})
