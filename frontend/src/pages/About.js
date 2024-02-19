import React from 'react'
import "../index.css"
import lnmiitlogo from "../image/lnmiit.logo.png"
import aboutimage from "../image/lnmiit_about.jpeg"
import { NavLink  } from "react-router-dom";
const About = () => {
  return (
    <>
        <div
      className="min-w-screen  min-h-screen max-[400px]:mt-[5rem] max-[770px]:mt-[3rem] flex items-center p-5 lg:p-10 overflow-hidden   "
    >
      <div
        className="w-full max-w-6xl rounded bg-slate-200 shadow-xl p-10 lg:p-20 mx-auto text-gray-800 md:text-left"
      >
        <div className="md:flex items-center -mx-10 ">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={aboutimage}
                className="w-full relative z-10"
                alt="aboutimage"
              />
              <div
                className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"
              ></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl text-center mb-5">ABOUT US</h1>
              <p className="text-sm">The L-CTBIEL (Centre for Technology Business
                Incubation and Entrepreneurial Leadership) is a
                multi-disciplinary innovation, incubation and entrepreneurial
                hub with a vision to develop and facilitate the ecosystem
                necessary for innovation, incubation and entrepreneurial
                leadership at LNMIIT. Despite being a relatively younger
                institution in Rajasthan, the LNMIIT Jaipur has developed a
                strong footprint in entrepreneurship and yielded several
                companies serving the nation in terms of job creation and
                revenue generation.
                <hr/>

                <br/>
                Operating Model: LCTBIEL:A multi-disciplinary innovation, incubation and entrepreneurial hub.
               <hr/>
               <br/>
                Through this centre, a strong team comprising students, interested/involved faculty, research scholars, and students is being developed for interactive, jointly steered and highly coordinated efforts to produce several successful start-ups.
                <NavLink 
                  to="https://www.lnmiit.ac.in/"
                  target="_blank"
                  className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                >MORE <i className="mdi mdi-arrow-right"></i></NavLink ></p>
            </div>
          </div>
        </div>
      </div>
    </div>


 
    <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
      <div>
        <NavLink  to="/" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
          <img className="object-cover object-center w-full h-full rounded-full" src={lnmiitlogo} alt='lnmiitlogo'/>
        </NavLink >
      </div>
    </div>
    </>
  )
}

export default About