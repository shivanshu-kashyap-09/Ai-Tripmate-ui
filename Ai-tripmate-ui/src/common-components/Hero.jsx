import React from "react";
import background from '../assets/back.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen  flex items-center justify-center text-white bg-cover p-10 w-full "
      style={{ backgroundImage: `url(${background})` }}>
      <div className="text-center">
        <h2 className="text-5xl text-black font-bold">Explore the World,<br></br> One Destination at a Time!</h2>
        <Link 
          to="/fulltripexplore" 
          className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md 
          hover:bg-green-700 transition-all duration-300"
        >
          Book a Full Trip
        </Link>
      </div>
    </section>
  );
};

export default Hero;