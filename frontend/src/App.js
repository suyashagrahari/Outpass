import React from 'react';
import './index.css';
import Home from '../src/pages/Home';
import About from './pages/About';
import StudentRegistration from './pages/Student_registration';
import Contact from './pages/Contact';
import Error from './pages/Error';
import FacultyRegistration from './pages/Faculty_registration';
import Login from './pages/Login';
import Registrationerrors from './pages/Registrationerrors';
import Registration from './pages/Registration';
import Outpass from './pages/Outpass';
import List from './pages/List';
import { Routes, Route } from "react-router-dom";
import Logout from './pages/Logout';

import Navbar from './components/Navbar';
import Profile from './pages/Profile';


const App = () => {

  return (
    <>

    <Navbar/>
    
    <Routes>
      
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/" element={
        <>
          <Home/>
        </>
      }/>

      {/* <About/> */}
      <Route path="/about" element={<About/>}/>
      {/* <Faculty_registration/> */}
      <Route path="/facultyregister" element={
        <>
          
          <FacultyRegistration/>
        </>
      }/>
      {/* <Login/> */}
      <Route path="/login" element={
        <>
          
          <Login/>
        </>
      }/>
      {/* <Student_registration/> */}
      <Route path="/studentregister" element={
        <>
          
          <StudentRegistration/>
        </>
      }/>
      {/* <Contact/> */}
      <Route path="/contact" element={
        <>
          
          <Contact/>
        </>
     }/>
      {/* <Error/> */}
      <Route path="/error" element={<Error/>}/>
      {/* <Registrationerrors/> */}
      <Route path="/registrationerrors" element={<Registrationerrors/>}/>
      {/* <Registration/> */}
      <Route path="/registrations" element={
        <>
          
          <Registration/>
        </>
      }/>
      {/* <Outpass/> */}
      <Route path="/outpass" element={
        <>
          
          <Outpass/>
        </>
      }/>
      {/* <List/> */}
      <Route path="/list" element={
         <>
          
          <List/>
        </>
      }/>
      <Route path="/logout" element={<Logout/>}/>
    </Routes>

    </>
  )
}

export default App