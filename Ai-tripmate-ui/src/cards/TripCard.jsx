import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TripCard({ title, images, description, showBooking, navigateTo, serviceName}) {
    const [location, setLocation] = useState("");
    const [budget , setBudget] = useState("");
    const [people , setPeople] = useState("");
    const [days , setDays] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      };

    const handleSubmit = () => {
        if(!location || !people || !days || !budget) {
            setError("All fields are required");
            return ;
        }else{
            const queryParams = new URLSearchParams({location , budget , people , days}).toString();
            const path = "/service/trip";
            // navigate(${path}?${queryParams});
            setLocation("");
            setBudget("");
            setPeople("");
            setDays("");
        }
    };
  return (
    <section className="py-12 bg-gray-100 w-full">
    <div
      className="container mx-auto bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-screen-lg 
      transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
    >
      {/* Image Slider (Left Side) */}
      <div className="w-full md:w-1/2">
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <div key={i}>
              <img src={img} alt={title} className="w-full h-110 object-cover rounded-l-lg" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Description + Booking Form */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-gradient-to-r from-gray-100 to-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>

        {/* Booking Form */}
        {showBooking && (
          <div className="mt-6 flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter Location"
              className="p-3 border border-black rounded-lg w-full focus:ring-2 focus:ring-blue-400 text-black"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="budget"
              className="p-3 border border-black rounded-lg w-full focus:ring-2 focus:ring-blue-400 text-black"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
              <input
              type="text"
              placeholder="persons"
              className="p-3 border border-black rounded-lg w-full focus:ring-2 focus:ring-blue-400 text-black"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
            <input
              type="text"
              placeholder="days"
              className="p-3 border border-black rounded-lg w-full focus:ring-2 focus:ring-blue-400 text-black"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              check
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
);
};

export default TripCard