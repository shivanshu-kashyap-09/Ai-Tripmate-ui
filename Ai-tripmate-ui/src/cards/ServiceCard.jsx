import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceCard = ({ title, images, description, showBooking, serviceName }) => {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false, // Keep arrows if needed; remove if not
  };

  const handleSubmit = () => {
    if (!location || !budget) {
      setError("Both fields are required!");
      return;
    } else {
      const queryParams = new URLSearchParams({ location, budget }).toString();
      const path = serviceName === "hotel" ? "/service/hotel" : "/service/restaurant";
      navigate(`${path}?${queryParams}`);
      setLocation("");
      setBudget("");
    }
  };

  return (
    <section className="py-7 bg-blue-50">
      <div
        className="container mx-auto bg-blue shadow-lg rounded-3xl flex flex-col md:flex-row w-full max-w-screen-lg 
        transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden "
      >
        {/* Image Slider (Left Side) */}
        
        <div className="w-full md:w-1/2 h-90 ">
            <Slider {...sliderSettings}>
              {images.map((img, i) => (
                <div key={i}>
                  <img src={img} alt={title} className="w-full h-90   bg-blue-100" />
                </div>
              ))}
            </Slider>
          </div>

        {/* Description + Booking Form */}
        <div className="w-full md:w-1/2 p-9 flex flex-col justify-center bg-gradient-to-r from-blue-100 to- blue-90">
          <h2 className="text-3xl font-bold text-gray-800 ">{title}</h2>
          <p className="text-gray-600 text-lg">{description}</p>

          {/* Booking Form */}
          {showBooking && (
            <div className="mt-6 space-y-4 br">
              {/* Location Input */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <label htmlFor="location" className="text-black font-medium">
                  Enter Location:
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter Location"
                  className="p-2 border border-black rounded-lg focus:ring-2 focus:ring-blue-400 text-black w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Budget Input */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <label htmlFor="budget" className="text-black font-medium">
                  Enter Budget:
                </label>
                <input
                  type="text"
                  id="budget"
                  placeholder="Enter Budget"
                  className="p-2 border border-black rounded-lg focus:ring-2 focus:ring-blue-400 text-black w-full"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600">{error}</p>}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-all w-full"
              >
                Check
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
