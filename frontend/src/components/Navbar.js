import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountMenu from './Menu';
import TemporaryDrawer from './TempraryDrawer';

const Navbar = () => {
    const [parseData, setParseData] = useState(null);
    const [firstLetter, setFirstLetter] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const user = localStorage.getItem('Studentlogintoken') || localStorage.getItem('Facultylogintoken');
            if (user) {
                const userData = JSON.parse(user);
                setParseData(userData);
                if (userData && userData.email) {
                    setFirstLetter(userData.name[0]?.toUpperCase());
                } else {
                    console.error("Email not found in userData or userData is null or undefined");
                }
            }
        };

        fetchData(); // Fetch data only once after the initial render
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <nav id="nav" className="fixed inset-x-0 top-0 flex flex-row justify-between z-10 text-white bg-transparent">
                <div className="p-4">
                    <div className="font-extrabold tracking-widest text-xl"><NavLink to="/" className="transition duration-500 hover:text-indigo-500">LNMIIT</NavLink ></div>
                </div>
                {
                    parseData && parseData.token ? (
                        parseData.user === "faculty" ? (
                            <div className="p-4 hidden md:flex flex-row justify-between font-bold">
                                <NavLink to="/list" className="mx-4 text-lg border-b-2 border-transparent hover:text-indigo-700 hover:border-b-2 hover:border-indigo-300 transition duration-500">Student List</NavLink>
                                <AccountMenu firstLetter={firstLetter} />
                            </div>
                        ) : (
                            <div className="p-4 hidden md:flex flex-row justify-between font-bold">
                                <NavLink to="/outpass" className="mx-4 text-lg border-b-2 border-transparent hover:text-indigo-700 hover:border-b-2 hover:border-indigo-300 transition duration-500">Outpass</NavLink>
                                <AccountMenu firstLetter={firstLetter} />
                            </div>
                        )
                    ) : (
                        <div className="p-4 hidden md:flex flex-row justify-between font-bold">
                            <NavLink id="hide-after-click" to="/login" className="mx-4 text-lg hover:text-indigo-700 border-b-2 border-transparent hover:border-b-2 hover:border-indigo-300 transition duration-500">Login</NavLink>
                            <NavLink to="/registrations" className="mx-4 text-lg border-b-2 border-transparent hover:text-indigo-700 hover:border-b-2 hover:border-indigo-300 transition duration-500">Register</NavLink>
                            <NavLink to="/contact" className="mx-4 text-lg border-b-2 border-transparent hover:text-indigo-700 hover:border-b-2 hover:border-indigo-300 transition duration-500">Contact Us</NavLink>
                            <NavLink to="/" className="mx-4 text-lg border-b-2 border-transparent hover:text-indigo-700">
                                <div className='w-14 h-14 bg-white flex justify-center items-center text-black rounded-full mt-[-13px] text-3xl'>
                                    <lord-icon src="https://cdn.lordicon.com/fmasbomy.json" className="w-[100px]" trigger="hover"></lord-icon>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
                <div id="nav-open" className="p-4 md:hidden" onClick={toggleDrawer}>
                <TemporaryDrawer />
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar;
