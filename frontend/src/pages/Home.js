import React from 'react'

import "../index.css";

import { NavLink  } from "react-router-dom";



const Home = () => {

  return (
    <>
    {/* <Navbar/> */}
    
  <header id="up" className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative">
	
		<div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" id='suyash'>
			<div className="mx-2 text-center">
				<h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
					<span className="text-white">Right Place To </span>
           </h1>
           <h2 className="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
            Get <span className="text-white" >Your Out pass</span> 
           </h2>
           <div className="inline-flex">
           <button className="p-2 my-5 mx-2 border-indigo-700 text-indigo-700  hover:bg-indigo-800 font-bold hover:text-white rounded border-2  hover:border-indigo-800 shadow-md transition duration-500 md:text-xl"><NavLink  to="/about">About Us</NavLink ></button>
           </div>
        </div>
    </div>
    </header>
    </>
  )
}

export default Home