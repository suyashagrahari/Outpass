import React from 'react'
import "../index.css"
import { NavLink  } from "react-router-dom";
const Login_nav = () => {
  return (
    <>
        <nav id="nav" className="fixed inset-x-0 top-0 flex flex-row justify-between z-10 text-white bg-transparent">

<div className="p-4">
    <div className="font-extrabold tracking-widest text-xl"><NavLink  to="/" className="transition duration-500 hover:text-indigo-500">LNMIIT</NavLink ></div>
</div>

{/* <!-- Nav Items Working on Tablet & Bigger Sceen --> */}
<div className="p-4 hidden md:flex flex-row justify-between font-bold">
    <NavLink  to="/registrations" className="mx-4 text-lg border-b-2  hover:text-indigo-700 border-transparent hover:border-b-2 hover:border-indigo-300 transition duration-500">Register</NavLink >
    <NavLink  to="/contact" className="mx-4 text-lg border-b-2 border-transparent hover:text-indigo-700  hover:border-b-2 hover:border-indigo-300 transition duration-500">Contact Us</NavLink >
</div>

{/* <!-- Burger Nav Button on Mobile --> */}
<div id="nav-open" className="p-4 md:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
</div>
</nav>
    </>
  )
}

export default Login_nav