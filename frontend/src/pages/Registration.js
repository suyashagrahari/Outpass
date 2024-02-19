import React from 'react'
import Register_nav from '../components/Register_nav'
import { NavLink  } from "react-router-dom";
const Registration = () => {
  return (
    <>
    {/* <Register_nav/> */}
        {/* <!-- Opened Nav in Mobile, you can use javascript/jQuery --> */}
	<div id="nav-opened" className="fixed left-0 right-0 hidden bg-white mx-2 mt-16 rounded-br rounded-bl shadow z-10">
		<div className="p-2 divide-y divide-gray-600 flex flex-col">
			<NavLink  to="#about" className="p-2 font-semibold hover:text-indigo-700">About</NavLink >
			<NavLink  to="#whyus" className="p-2 font-semibold hover:text-indigo-700">Why Us ?</NavLink >
			<NavLink  to="#showcase" className="p-2 font-semibold hover:text-indigo-700">Our Products</NavLink >
		</div>
	</div>

	<header id="up" className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative">
		{/* <!-- Overlay Background + Center Control --> */}
		<div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" id='suyash'>
			<div className="mx-2 text-center">
				<h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
					<span className="text-white">Right</span> Place To
           </h1>
           <h2 className="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
            Get <span className="text-white">Your Out pass</span> 
           </h2>
           <div className="inline-flex">
          
           <NavLink  to="/facultyregister"><button className="p-2 my-5 mx-2 bg-indigo-700 hover:bg-indigo-800 font-bold text-white rounded border-2 border-transparent hover:border-indigo-800 shadow-md transition duration-500 md:text-xl">Faculty</button></NavLink >
           <NavLink  to="/studentregister"><button className="p-2 my-5 mx-2 bg-indigo-700 hover:bg-indigo-800 font-bold text-white rounded border-2 border-transparent hover:border-indigo-800 shadow-md transition duration-500 md:text-xl">Student</button></NavLink >
           </div>
        </div>
    </div>
</header>
    </>
  )
}

export default Registration