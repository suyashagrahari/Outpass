import React ,{ useState } from "react";
import "../index.css";
import lnmiitlogo from "../image/lnmiit.logo.png";
import { NavLink } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";




const Login = () => {

  
  
  
  const [user,setUser] = useState({
    email:"" , password:""
  })

  let name,value;
  const handleChange = (e)=>{
    // e.preventDefult();
    name = e.target.name;
    console.log(name);
    value = e.target.value;
    setUser({...user,[name]: value});
  }


  const handleSubmit = async () => {
    try {
      toast.loading("wait page is loading...");
      const res = await axios.post("https://outpass-backend.onrender.com/login", user);
      console.log("Response:", res);
  
      if (res && res.data) {
        console.log("Response Data:", res.data);
  
        if (res.data.user.Faculty) {
          
          console.log("student");
          console.log(res.data.user.FacultyToken);
          console.log(res.data);

          const Data = {
            id : res.data.user.Faculty._id,
            name:res.data.user.Faculty.name,
            user : res.data.user.Faculty.user,
            email:res.data.user.Faculty.email,
            rollno:res.data.user.Faculty.rollno,
            phone:res.data.user.Faculty.phone,
            token : res.data.user.FacultyToken
          }

          localStorage.setItem("Facultylogintoken",JSON.stringify(Data));

        

          // console.log("faculty");
          // console.log(res.data.user.StudentToken);
          // localStorage.setItem("Facultylogintoken",res.data.user.FacultyToken);
          toast.success(res.data.message);
          window.location.href = "/list"
          // Navigate("/list");
          
        } else if (res.data.user.Student) {
          console.log("student");
          console.log(res.data.user.StudentToken);
          console.log(res.data);

          const Data = {
            id : res.data.user.Student._id,
            name:res.data.user.Student.name,
            user : res.data.user.Student.user,
            email:res.data.user.Student.email,
            rollno:res.data.user.Student.rollno,
            phone:res.data.user.Student.phone,
            token : res.data.user.StudentToken
          }
          localStorage.setItem("Studentlogintoken",JSON.stringify(Data));
         
          toast.success(res.data.message);
          window.location.href = "/outpass"
        } else {
          console.error("Invalid response data:", res.data);
          toast.error("An error occurred while processing your request. Please try again later.");
        }
      } else {
        console.error("Response is undefined or does not contain data property");
        toast.error("An error occurred while processing your request. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your request. Please try again later.");
    }
  }
  return (
    <>
      {/* <Login_nav /> */}
      <header
        id="up"
        className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative">
        <Toaster />

        <div
          className="h-screen bg-opacity-50 bg-black flex items-center justify-center"
          id="suyash">
          {/* <form action="/loginform" method="post" encType="multipart/form-data"> */}
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
              <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                <div className="self-start hidden lg:flex flex-col  text-white">
                  <h1 className="mb-3 font-bold text-5xl">
                    Hi ? Welcome Back Aji{" "}
                  </h1>
                  <p className="pr-3 text-white ">
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups
                  </p>
                </div>
              </div>
              <div className="flex justify-center self-center  z-10">
                <div className="p-12 bg-white mx-auto rounded-2xl w-[26rem] max-[420px]:w-[20rem] max-[420px]:mt-[5rem]  max-[300px]:w-[16rem] max-[300px]:mt-[2rem]">
                  <div className="mb-4">
                    <h3 className="font-semibold text-2xl text-gray-800">
                      Log In{" "}
                    </h3>
                    <p className="text-gray-500">
                      Please login in to your account.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        Email
                      </label>
                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="mail@gmail.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                        Password
                      </label>
                      <input
                        className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember_me"
                          name="remember_me"
                          type="checkbox"
                          className="h-4 w-4 bg-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember_me"
                          className="ml-2 block text-sm text-gray-800">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <NavLink
                          to="#"
                          className="text-indigo-600 hover:text-indigo-700">
                          Forgot your password?
                        </NavLink>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-indigo-600  hover:bg-indigo-700 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={handleSubmit}>
                        Log In
                      </button>
                    </div>
                  </div>

                  <div className="pt-5 text-center text-gray-400 text-xs">
                    <span>
                      Copyright © 2021-2022
                      <NavLink
                        to="https://codepen.io/uidesignhub"
                        rel=""
                        target="_blank"
                        title="Ajimon"
                        className="text-indigo hover:text-green-500 ">
                        AJI
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/* </form> */}
        </div>
      </header>

      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <NavLink
            to="/"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src={lnmiitlogo}
              alt="lnmiitlogo"
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
