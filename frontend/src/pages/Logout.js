// Logout.js
import React, { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Logout = () => {
    const callLogoutPage = async () => {
        try {
            let token;
            if (localStorage.getItem("Studentlogintoken")) {
                token = JSON.parse(localStorage.getItem("Studentlogintoken")).token;
            } else if (localStorage.getItem("Facultylogintoken")) {
                token = JSON.parse(localStorage.getItem("Facultylogintoken")).token;
            } else {
                console.log("No token found");
                return;
            }
            toast.loading("Please wait...");
            const res = await axios.get('https://outpass-backend.onrender.com/logout', {
                headers: {
                    'Authorization': token
                }
            });
            
            if (res.status === 200) {
                toast.success("Logout Successful!");
                localStorage.removeItem("Studentlogintoken");
                localStorage.removeItem("Facultylogintoken");
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }finally {
            toast.dismiss(); // Dismiss loading toast after try-catch block
        }
    };

    useEffect(() => {
        callLogoutPage();
    }, []);

    return (
        <Toaster />
    );
}

export default Logout;
