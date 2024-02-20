import React, { useState } from "react";
import lnmiitlogo from "../image/lnmiit.logo.png";
import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const Student_registration = () => {

  const Navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    rollno: "",
    email: "",
    phone: "",
    confirmpassword: "",
    password: "",
  });

  // ************** Same as above *****************

  // const[name, setName] = useState("");
  // const[rollno, setRollno] = useState("");
  // const[email, setEmail] = useState("");
  // const[phone, setPhone] = useState("");
  // const[password, setPassword] = useState("");
  // const[confirmpassword, setConfirmpassword] = useState("");
  // const[file,setFile] = useState("");
  let name, value;

  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    console.log(e.target.name);
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  
  const handleSubmit = async () => {
    try {
      
      toast.loading("wait page is loading...");
      const res = await axios.post("https://outpass-backend.onrender.com/studentregister", user);
      toast.dismiss();
      const result = res.data;
      console.log(result);
      console.log(res);
      if (res.status === 200) {
        toast.success("Registration successful !!");
        setTimeout(() => {
          Navigate("/login");
        }, 500);
      } else {
        toast.error("Registration unsuccessful !!");
      }
    } catch (error) {
      // Log the error message or handle it appropriately
      console.error("Error during login:", error);
      
      // Display a meaningful error message to the user
      toast.error(error.response.data, {
        duration: 3000,
        position: "top-center",
      });
    }
  };
  
  return (
    <>
      {/* <Register_nav /> */}
      <Toaster />
      <header
        id="up"
        className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative">
        <div
          className="h-screen bg-opacity-50 bg-black flex items-center justify-center"
          id="suyash">
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
              <div className="self-start hidden lg:flex flex-col  text-white">
                <h1 className="mb-3 font-bold text-5xl">
                  Hi ? Welcome Back Aji{" "}
                </h1>
                <p className="pr-3 text-white ">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups
                </p>
              </div>
            </div>

           
            <div className="flex justify-center self-center  z-10">
            {/* <form onSubmit={handleSubmit}> */}
              <div className="p-12 bg-white mx-auto rounded-2xl max-[420px]:w-[20rem]   max-[300px]:w-[16rem]  ">

                <div className="mb-4">
                  <h3 className="font-semibold text-2xl text-gray-800">
                    Register{" "}
                  </h3>
                  <p className="text-gray-500">
                    Enter your information to register
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full"
                      type="text"
                      name="name"
                      
                      placeholder="Full name"
                      value={user.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full"
                      type="text"
                      name="rollno"
                      
                      placeholder="Roll No"
                      value={user.rollno}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none w-full"
                      type="number"
                      name="phone"
                      
                      placeholder="Phone No"
                      value={user.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none w-full"
                      type="text"
                      name="email"
                      
                      placeholder="Email Address"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      
                      className="pl-2 outline-none border-none w-full"
                      name="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      className="pl-2 outline-none border-none w-full"
                      name="confirmpassword"
                      
                      placeholder=" Confirm Password"
                      value={user.confirmpassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* // ************************************ FILE UPLOAD INPUT ***********************************  */}
                  {/* <div className="flex items-center border-2 rounded-2xl">
                <input className="text-indigo-200" type="file" name="uploadfile" onChange={(e)=>setFile(e.target.value)}  required/>
               </div>
     
							
             */}

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

                  {/* // ************************************ REGISER BUTTON ***********************************  */}
                  <div>
                    <button
                      type="submit"
                      
                      value="Submit"
                      className="w-full flex justify-center bg-indigo-600  hover:bg-indigo-700 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={handleSubmit}>
                      Register
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
              {/* </form> */}
            </div>
            
          </div>
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

export default Student_registration;
