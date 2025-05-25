// import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white w-[100%]">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://d25tul17qsylcj.cloudfront.net/asw_public_landscape_20241029.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source
          src="https://d25tul17qsylcj.cloudfront.net/asw_public_portrait_20241029.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
      </video>

      {/* Overlay Content */}
      <div className="relative text-center  bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-5xl font-bold text-white">
          Explore the World, <br /> One Destination at a Time!
        </h2>
        {/* <Link
          to="/fulltripexplore"
          className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md 
          hover:bg-green-700 transition-all duration-300"
        >
          Book a Full Trip
        </Link> */}
      </div>
    </section>
  );
};

export default Hero;
