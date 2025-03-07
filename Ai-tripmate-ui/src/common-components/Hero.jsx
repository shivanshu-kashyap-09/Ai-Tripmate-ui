import React from "react";
import hellojava from "../assets/back.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen  flex items-center justify-center text-white bg-cover p-10 w-full "
      style={{ backgroundImage: `url(${hellojava})` }}>
      <div className="text-center">
        <h2 className="text-5xl text-black font-bold">Explore the World,<br></br> One Destination at a Time!</h2>
        <button className="mt-5 bg-white text-blue-400 px-6 py-2 rounded-lg hover:bg-white">
          Book a Full Trip
        </button>
      </div>
    </section>
  );
};

export default Hero;