import React ,{createContext,useState} from "react";

export const UserContext = createContext();

export const UserProvider = (props) =>{
  var [authorisedStudent, setAuthorisedStudent] = useState({
    id:"", name:"" ,user:"", email:"" ,rollno:"", phone:"",token:""
  })
  return(
    <UserContext.Provider value = {{authorisedStudent, setAuthorisedStudent}}>
        {props.children}
    </UserContext.Provider>
  )
}