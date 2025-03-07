import React from "react";
import { FaShareAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceDetailCard = ({ title, images, description, location, price, rating, mapLocation, originalPrice, discount, reviews }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapLocation)}`, "_blank");
  };

  return (
    <section className="py-5 bg-gray-100 w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full md:w-4/5 overflow-hidden border border-gray-300">
        {/* Left Side: Image Slider */}
        <div className="w-full md:w-1/3 relative">
          <Slider {...sliderSettings}>
            {images?.map((img, i) => (
              <div key={i}>
                <img src={img} alt={title} className="w-full h-56 md:h-full object-cover" />
              </div>
            ))}
          </Slider>
          <div className="absolute top-2 left-2 bg-blue-700 text-white text-sm font-semibold px-2 py-1 rounded-md">
            {rating} <span className="text-xs">/10</span>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-blue-800">{title}</h2>
            <p className="text-gray-600 text-sm md:text-base">{description}</p>
            <div className="flex items-center mt-2 text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{location}</span>
              <span className="mx-2">•</span>
              <button onClick={openGoogleMaps} className="text-blue-600 hover:underline">
                Show on map
              </button>
            </div>
            <span className="text-green-700 text-sm font-semibold bg-green-100 px-2 py-1 rounded-md mt-2 inline-block">
              Early 2025 Deal
            </span>
          </div>

          {/* Price & Ratings */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-red-500 text-sm line-through">₹{originalPrice}</span>
              <span className="text-xl font-bold text-gray-800 ml-2">₹{price}</span>
              <span className="text-gray-500 text-xs ml-1">+ ₹{discount} taxes and charges</span>
            </div>
            <div className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-blue-800 font-semibold">{rating}</span>
              <span className="text-gray-600 text-sm ml-1">({reviews} reviews)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              See availability
            </button>
            <FaShareAlt className="text-blue-500 text-2xl ml-4 cursor-pointer hover:text-blue-700" title="Share" />
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default ServiceDetailCard;
