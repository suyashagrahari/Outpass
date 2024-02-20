import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import lnmiitlogo from "../image/lnmiit.logo.png";

const Outpass = () => {
  const Navigate = useNavigate();

  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
    rollno: '',
    phone: '',
    visitpurpose: '',
    mode: '',
    time: '',
    date: '',
    status: 'xyz'
  });

  const [mode, setMode] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [visitpurpose, setVisitPurpose] = useState('');

  const callOutpassPage = async () => {
    try {
      const data = localStorage.getItem('Studentlogintoken');

      if (!data) {
        toast.error("User is not valid");
        Navigate("/login");
        console.log("Token is not provided");
        return;
      }
      
      const user = JSON.parse(data);

      setUserData({
        _id: user.id,
        name: user.name,
        email: user.email,
        rollno: user.rollno,
        phone: user.phone,
      });
  
      if (!user.token) {
        
       
          toast.error("User is not valid");
      
        window.location.href = "/"
        return;
      }

      toast.loading("Please wait...");
      const res = await axios.get('https://outpass-backend.onrender.com/outpass', {
        headers: {
          'Authorization': user.token,
        }
      });
      toast.dismiss();
  
      if (res.status === 200) {
        
        setTimeout(()=>{
          toast.success(res.data.message);
        },0)
        Navigate("/outpass")
        
      } else {
        console.log(res.response.data.error)
        setTimeout(()=>{
          toast.error(res.response.data.error);
        },0)
        Navigate("/login");
      }
    } catch (error) {
      setTimeout(()=>{
        toast.error(error.response.data);
      },0)
      Navigate("/outpass");
    }finally {
      toast.dismiss(); // Dismiss loading toast after try-catch block
  }
  };
  
  useEffect(() => {
    callOutpassPage();
  }, []);

  const handleSubmit = async () => {
    try {
      const user = { ...userData, mode, date, time, visitpurpose };
      toast.loading("Please wait...");
      const result = await axios.post('https://outpass-backend.onrender.com/outpass', user);
      toast.dismiss();
      if (result.status === 200) {
        
        setTimeout(() => {
          toast.success(result.data.message);
        },100);
        setMode("");
        setDate("");
        setTime("");
        setVisitPurpose("");
        Navigate("/outpass")
      }
      else{
        setTimeout(() => {
          toast.error(result.data.error);
        },100);
        Navigate("/outpass")
      }
    } catch (error) {
      setTimeout(()=>{
        toast.error(error.response.data.error);
      },0)
      Navigate("/outpass")
      console.log(error);
    }finally {
      toast.dismiss(); // Dismiss loading toast after try-catch block
  }
  };

  return (
    <>
      <Toaster />
      <header id="up" className="bg-center bg-fixed bg-no-repeat bg-cover h-screen">
        {/* Your header JSX */}
     
      <div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" id='suyash'>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center max-[640px]:mt-[13rem]">
          <div className="flex justify-center self-center z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-[35rem] max-[420px]:w-[22rem] max-[640px]:w-[25rem] ">
              <div className="mb-4 flex flex-col items-center justify-center ">
                <h3 className="font-semibold text-2xl text-center text-gray-800">{userData.name}</h3>
              </div>
              <h3 className="text-xl text-center text-gray-800 mb-4">Generate your Outpass</h3>
              <div className="space-y-5 ">
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mx-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none text-black"
                    type="email"
                    name="email"
                    value={userData.email}
                    placeholder="Email"
                    readOnly
                  />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mx-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name="name"
                    value={userData.name}
                    placeholder="Name"
                    readOnly
                  />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mx-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name="mode"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    placeholder="Transportation Mode"
                    required
                  />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mx-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Return Date"
                  />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mx-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="time"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Return Time"
                    required
                  />
                </div>

                <div className="border-2 py-2 px-3 mx-5 rounded-2xl">
                  <textarea
                    className="pl-2 outline-none border-none min-h-[8rem] max-h-[8rem] w-full"
                    type="textarea"
                    name="visitpurpose"
                    value={visitpurpose}
                    onChange={(e) => setVisitPurpose(e.target.value)}
                    placeholder="Purpose of visit"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="mx-5">
                <button
                  type="submit"
                  className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 mt-5"
                  onClick={handleSubmit}
                >
                  Generate Outpass
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </header>
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mx-10 mr-4 z-10">
        <div>
          <NavLink to="/" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img className="object-cover object-center w-full h-full rounded-full" src={lnmiitlogo} alt="lnmiit logo" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Outpass;
