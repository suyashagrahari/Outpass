import React ,{useEffect} from 'react'
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';

const Logout = () => {

    
    const callLogoutPage = async()=>{
    try {
        if(localStorage.getItem("Studentlogintoken"))
        {
            let User = localStorage.getItem("Studentlogintoken");
            let parseData = JSON.parse(User);
            console.log("hello siuaysh ye eha ", parseData);
            const res = await axios.get('https://outpass-backend.onrender.com/logout', 
            {
                headers: { 
                'Authorization': parseData.token,
                }
            })
            console.log(res);
            if(res.status === 200)
            {
                toast.success("Logout Successfull!");
                window.location.href ="/"
            }
        }
        if(localStorage.getItem("Facultylogintoken"))
        {
            let User = localStorage.getItem("Facultylogintoken");
            let parseData = JSON.parse(User);
            console.log("hello siuaysh ye eha ", parseData);
            
            const res = await axios.get('https://outpass-backend.onrender.com/logout', 
            {
                headers: { 
                'Authorization': parseData.token,
                }
            })
            console.log(res);
            if(res.status === 200)
            {
                toast.success("Logout Successfull!");
                window.location.href = "/"
            }
        }
        else{
            console.log("error")
        }
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
 callLogoutPage();  // we can't use asynchronous function in useeffects thats why i am declaring this function outside the useEffects.
}, [])

return(
    <Toaster/>
)
}

export default Logout