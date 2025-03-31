import React from "react";
import { FaShareAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceDetailCard = ({
  title, images, description, location, price, rating,
  mapLocation, reviews
}) => {

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
      <div className="bg-white shadow-lg rounded-lg flex h-[250px] flex-col md:flex-row w-full md:w-4/5 overflow-hidden border border-gray-300">

        <div className="w-full md:w-1/3 relative">
          <img src={images} alt="Service" className="w-full h-56 md:h-80 object-cover" />
          <div className="absolute top-2 left-2 bg-blue-700 text-white text-sm font-semibold px-2 py-1 rounded-md">
            {rating}
          </div>
        </div>

        <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-blue-800">{title}</h2>
            <p className="text-gray-600 text-sm md:text-base mt-3">{description}</p>
            <div className="flex items-center mt-4 text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="text-blue-500 text-lg">{price}</span>
            </div>

            <div className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-blue-800 font-semibold">{rating}</span>
              <span className="text-gray-600 text-sm ml-1">({reviews} reviews)</span>
            </div>

            <div className="flex gap-2 mr-4">
              <button
                onClick={shareService}
                className="p-2 rounded-full shadow-md hover:bg-gray-200 transition"
              >
                <FaShareAlt className="text-blue-600" size={20} />
              </button>
              <button
                onClick={openGoogleMaps}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
              >
                <FaMapMarkerAlt className="text-red-500" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailCard;
