import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100 dark:bg-white">
      <div className="container mx-auto text-center px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-900 mb-6">
          🌍 ABOUT US – Your Ultimate Travel Companion
        </h2>

        {/* About Description */}
        <p className="text-black dark:text-black max-w-6xl mx-auto text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-blue-400 dark:text-blue-500">Ai Tripmate</span>! 🚀✨  
          We are your one-stop destination for seamless and unforgettable trips. Whether you're planning a budget-friendly escape, a luxury vacation, or a personalized travel itinerary,  
          we have you covered!
        </p>

        <p className="text-black dark:text-black max-w-6xl mx-auto text-lg leading-relaxed mt-4">
          Our team of travel experts and tech enthusiasts is dedicated to making trip planning effortless and enjoyable.  
          We provide tailored recommendations for hotels, restaurants, and travel options based on your budget, location, and trip duration.
        </p>

        {/* Key Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "🎯 TAILOR-MADE TRIPS", desc: "Get customized travel plans based on your preferences." },
            { title: "🏨 HOTELS & STAYS", desc: "Choose from top-rated accommodations within your budget." },
            { title: "🍽 BEST RESTAURANTS", desc: "Explore top local and international dining experiences." },
            { title: "🚆 SEAMLESS TRAVEL", desc: "Book flights, trains, buses, or cabs easily." },
            { title: "⚡ REAL-TIME ASSISTANCE", desc: "Get instant travel deals and expert advice." },
            { title: "🌎 EXPLORE NEW DESTINATIONS", desc: "Discover hidden gems and must-visit places worldwide." },
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-blue-100 p-6 rounded-b-2xl rounded-t-2xl shadow-md bg-gradient-to-r from-blue-100 to- white ">
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-800">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* How to Use Our App */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold text-blue-600 dark:text-blue-500 mb-4">🚀 How to Use Ai Tripmate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1️⃣ Select Your Destination", desc: "Browse recommended places and choose your dream trip." },
              { step: "2️⃣ Choose Your Package", desc: "Pick from our custom trip plans, including hotels, dining, and transport." },
              { step: "3️⃣ Book & Enjoy", desc: "Secure your booking and experience a hassle-free journey." },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
                <h4 className="text-lg font-semibold text-blue-500 dark:text-blue-300">{item.step}</h4>
                <p className="text-gray-600 dark:text-gray-200 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;