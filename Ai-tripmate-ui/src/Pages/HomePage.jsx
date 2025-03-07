import React from 'react'
import Hero from '../common-components/Hero'
import Recommended from '../common-components/Recommended'
import About from '../common-components/About'
import Feedback from '../common-components/Feedback'
import ServicesCards from "../cards/ServicesCards";

function HomePage() {
  return (
        <div>
            <Hero />
            <h1 className="text-center text-5xl text-blue-400 font-bold bg-white mt-4">OUR SERVICES</h1>
            <ServicesCards/>
            <Recommended />
            <About />
            <Feedback />     
         </div>
  )
}

export default HomePage