import React from "react";
import { FaShareAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceDetailCard = ({ 
  title, images, description, location, price, rating, 
  mapLocation, originalPrice, discount, reviews 
}) => {
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

  const shareService = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this service: ${title}`,
        url: window.location.href,
      }).catch(err => console.error("Error sharing:", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <section className="py-5 bg-gray-100 w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full md:w-4/5 overflow-hidden border border-gray-300">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/3 relative">
          <img src={images} alt="Service" className="w-full h-56 md:h-80 object-cover" />
          <div className="absolute top-2 left-2 bg-blue-700 text-white text-sm font-semibold px-2 py-1 rounded-md">
            {rating}
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
          </div>

          {/* Price & Ratings */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-red-500 text-sm line-through">{originalPrice}</span>
              <span className="text-xl font-bold text-gray-800 ml-2">{price}</span>
              <span className="text-gray-500 text-xs ml-1">+ {discount} taxes and charges</span>
            </div>
            <div className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-blue-800 font-semibold">{rating}</span>
              <span className="text-gray-600 text-sm ml-1">({reviews} reviews)</span>
            </div>
          </div>

          {/* Buttons: Share & Map */}
          <div className="flex justify-between items-center mt-4">
            {/* Share Button */}
            <button 
              onClick={shareService} 
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition duration-300"
            >
              <FaShareAlt className="mr-2" /> Share
            </button>

            {/* Map Button */}
            <button 
              onClick={openGoogleMaps} 
              className="flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition duration-300"
            >
              <FaMapMarkerAlt className="mr-2" /> View on Map
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceDetailCard;
