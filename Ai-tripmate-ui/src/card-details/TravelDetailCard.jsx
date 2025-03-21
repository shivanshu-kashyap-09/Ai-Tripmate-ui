import { FaShareAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TravelDetailCard = ({ title, images, description, duration, timing, location, destinationLocation, date, price}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const openGoogleMaps = () => {
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(location)}&destination=${encodeURIComponent(destinationLocation)}`;
    window.open(googleMapsURL, "_blank");
  };

  return (
    <section className="py-5 bg-gray-100 w-screen">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-screen overflow-hidden">
        {/* Left Side*/}
        <div className="w-full md:w-1/3 relative">
          <img src={images} alt="Service" className="w-full h-56 md:h-80 object-cover" />
          <div className="absolute top-2 left-2 bg-blue-700 text-white text-sm font-semibold px-2 py-1 rounded-md">
            {rating}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="pb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>

            {/* Duration */}
            <div className="mt-3">
              <p className="font-medium text-gray-700">Duration: <span className="text-gray-900">{duration}</span></p>
            </div>

            {/* Timing */}
            <div className="mt-2">
              <p className="font-medium text-gray-700">Timing: <span className="text-gray-900">{timing}</span></p>
              <p className="font-medium text-gray-700">Date: <span className="text-gray-900">{date}</span></p>            
            </div>

            {/* Location */}
            <div className="flex items-center mt-4 text-gray-700">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{location} → {destinationLocation}</span>
            </div>
          </div>

          {/* Price & Rating */}
          <div>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-green-700 pr-[30%]">{price}</span>
              <div className="flex items-center">
                <FaStar className="text-yellow-500" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center mt-4 space-x-6">
              <FaShareAlt className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700" title="Share" />
              <FaMapMarkerAlt
                className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
                title="Open in Google Maps"
                onClick={openGoogleMaps}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelDetailCard;
