// import React from 'react'
import Hero from '../components/Hero'
import Recommended from '../components/Recommended'
import About from '../components/About'
import Feedback from '../components/Feedback'
import ServicesCards from "../cards/ServicesCards";

function HomePage() {
  return (
    <div className='w-full overflow-hidden justify-self-center-safe'>
      <Hero />
      <h1 className="text-center text-5xl text-blue-400 font-bold bg-white mt-4">OUR SERVICES</h1>
      <ServicesCards />
      <Recommended />
      <About />
      <Feedback />
    </div>
  )
}

export default HomePage