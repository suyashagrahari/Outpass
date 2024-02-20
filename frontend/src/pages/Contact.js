import React, { useState } from 'react'
import lnmiitlogo from "../image/lnmiit.logo.png";

import { NavLink  } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast";
import axios from 'axios';
const Contact = () => {

  const [user, setUser] = useState({
    name:"", email: "", message:"",
  })
  let name,value;
  const handleChange = (e)=>{
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value});
  }

  const handleSubmit = async()=>{
    try {
      toast.loading("wait page is loading...");
      const res = await axios.post("https://outpass-backend.onrender.com/contact",user);
      toast.dismiss();
      console.log(res);
      if(res.status === 200)
      {
        toast.success(res.data.message);
        setUser({
          name : "",
          email: "",
          message:""
        })
      }
      else if (res.data && res.data.error) { // Check if res.data exists and has an error property
        toast.error(res.data.error);
      } else {
        // Handle other cases where res.data may be undefined
        toast.error("An unexpected error occurred.");
      }
      
    } catch (error) {
      toast.error(error.response.data.error)  
      console.log(error);
      
    }
  }

  return (
    <>
    {/* <Contact_nav/> */}
    <Toaster/>
        <header id="up" className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative">


<div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" id="suyash">

{/* <form action="/sendmessage" method="post" enctype="multipart/form-data" > */}

    <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
<div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
<div className="self-start hidden lg:flex flex-col  text-white">
 
  <h1 className="mb-3 font-bold text-5xl">Contact us</h1>
  <p className="pr-3 text-white ">Need to get in touch with us? Either fill out the form with your inquiry or find the department email you'd like to contact below.</p>
</div>
</div>


<div className="flex justify-center self-center  z-10">
<div className="p-12 bg-white mx-auto rounded-2xl w-[26rem] max-[400px]:w-[20rem]">
    <div className="mb-4">
      <h3 className="font-semibold text-2xl text-gray-800">Contact Us </h3>
      <p className="text-gray-500">Enter your information to register</p>
    </div>
    <div className="space-y-5">


        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd" />
        </svg>
        <input className="pl-2 outline-none border-none w-full" type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full name" />
        </div>

        

       


        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className="pl-2 outline-none border-none w-full" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email Address" />
        </div>

              <div className=" border-2 py-2 px-3 rounded-2xl">
                    
                    <textarea className ="pl-2 outline-none border-none min-h-[16rem] max-h-[16rem] w-full" type="textarea" name="message" value={user.message}  onChange={handleChange} placeholder="What can we help you with?"  ></textarea>
        </div>

       





    <div>
      <button type="submit" value="Submit" className="w-full flex justify-center bg-indigo-600  hover:bg-indigo-700 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={handleSubmit}>
        Send Message
      </button>
    </div>
    </div>
    <div className="pt-5 text-center text-gray-400 text-xs">
      <span>
        Copyright © 2021-2022
        <NavLink  to="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" className="text-indigo hover:text-green-500 ">AJI</NavLink ></span>
    </div>
</div>
</div>
</div>
{/* // </form> */}
</div>








</header>


<div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
<div>
<NavLink to="/" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
  <img className="object-cover object-center w-full h-full rounded-full" src={lnmiitlogo} alt=''/>
</NavLink>
</div>
</div>


    </>
)
}

export default Contact