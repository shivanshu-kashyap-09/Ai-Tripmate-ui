import React from 'react'
import Header from '../common-components/Header'
import Hero from '../common-components/Hero'
import ServiceCard from '../cards/ServiceCard'
import Recommended from '../common-components/Recommended'
import About from '../common-components/About'
import Feedback from '../common-components/Feedback'
import Footer from '../common-components/Footer'
import logo2 from "../assets/logo.jpg";
import TravelCard from '../cards/TravelCard'
import TripCard from '../cards/TripCard'
import FullTripCard from '../cards/FullTripCard'
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