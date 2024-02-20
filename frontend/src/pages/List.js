import React, { useEffect, useState } from "react";
import lnmiitlogo from "../image/lnmiit.logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import handleStatus from "../components/handleStatus";



const List = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const handleStatus = async (status,studentId) => {
    try {
      // Construct the data object to send to the backend
      const data = {
        status: status, // 'Approved' or 'Disapproved'
        studentId: studentId
        // Add any other relevant data here
      };

      // Make an HTTP POST request to your backend API endpoint
      toast.loading("Please wait...");
      const res = await axios.post('https://outpass-backend.onrender.com/list', data);
      
      // Handle the response if needed
      console.log(res.data);
      if(res.status === 200){
        window.location.href = "/list"
        toast.success(res.data.message);
      }
     
    
      // Perform any other actions based on the response
    } catch (error) {
      // Handle errors
      toast.error(error.res.data.message);
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Facultylogintoken");
        if(!token)
        {
          navigate("/login");
          return;
        }
        let parseData = JSON.parse(token);
        if (!parseData.token) {
          toast.error("User is not valid");
          navigate("/login");
          return;
        }
        toast.loading("Please wait...");
        const response = await axios.get("https://outpass-backend.onrender.com/list", {
          headers: {
            Authorization: parseData.token,
          },
        });
        
        console.log(response);
        console.log(response.data.user.List[0]._id)
        if (response.status === 200) {
          toast.success(response.data.message);
          setStudents(response.data.user.List);
        } else {
          toast.error(response.response.data.error);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }finally {
        toast.dismiss(); // Dismiss loading toast after try-catch block
    }
    };

    fetchData();
  }, [navigate]);

  
   
    


  const token = localStorage.getItem("Facultylogintoken");
  if(!token)
  {
    console.log("token are not present")
    navigate("/login");
    return
  }
  let parseData = JSON.parse(token);


  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="font-bold xl:text-4xl l:text-3xl md:text-2xl sm:text-xl xs:text-l text-gray-100">
          {/* Your name or title */}{parseData.name.toUpperCase()}
        </div>
      </div>

      <div className="text-gray-100 flex justify-center pt-2 font-extrabold text-xl xs:text-xl md:text-3xl">
        Students List
      </div>
      <Toaster />

      <section className="container px-4 mx-auto mt-10">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Purpose
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Mode
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Return Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Return time
                      </th>
                      <th
                        scope="col"
                        className=" flex justify-center py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Approval
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, id) => (
                      <tr key={id}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                {student.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                            <h2 className="text-sm font-normal">
                              {student.phone}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <h2 className="text-sm font-normal">
                            {student.visitpurpose}
                          </h2>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{student.mode}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{student.date}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{student.time}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm whitespace-nowrap">
                          <div className="flex justify-center gap-x-2">
                            <button
                              type="submit"
                              name="status"
                              value="Approved"
                              className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800 hover:bg-green-300"
                              onClick={() => handleStatus('Approved', student._id)}
                            >
                              Approved
                            </button>
                            <button
                              type="submit"
                              name="status"
                              value="Disapproved"
                              className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800 hover:bg-red-300"
                              onClick={() => handleStatus('Disapproved', student._id)}
                            >
                              Disapproved
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mx-10 mr-4 z-10">
        <div>
          <NavLink
            to="/"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
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

export default List;
