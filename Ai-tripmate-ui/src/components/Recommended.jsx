import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { FaShareAlt, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommended = () => {
  const [details, setDetails] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/most-visit/details`, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("API Response:", response.data);
        if (response.status === 200) {
          setDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching recommended places:", error);
        setDetails([]);
      }
    };
    getDetails();
  }, []);

  const openLocation = (exploreName) => {
    const encodedAddress = encodeURIComponent(exploreName);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
  };

  const shareService = (place) => {
    if (navigator.share) {
      navigator.share({
        title: place.mostVisitPlaceName,
        text: `Check out this place: ${place.mostVisitPlaceName}, located at ${place.mostVisitPlaceAddress}.`,
        url: window.location.href,
      }).catch(err => console.error("Error sharing:", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section id="recommended">
      <h2 className="text-5xl text-blue-900 text-center font-bold bg-white p-6">
        RECOMMENDED PLACES
      </h2>
      <div className="container mx-auto">
        {details.length > 0 ? (
          <Slider {...sliderSettings}>
            {details.map((place, index) => (
              <div key={index} className="relative group p-2">
                <img
                  src={place.mostVisitPlaceImage !== `No entry found for: ${place.mostVisitPlaceName}` ? place.mostVisitPlaceImage : logo}
                  alt={place.mostVisitPlaceName}
                  className="w-full h-96 object-cover rounded-lg opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:blur-sm"
                />
                <div className="absolute bottom-0 left-0 w-full bg-opacity-60 text-black text-center p-2 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-lg font-semibold">{place.mostVisitPlaceName}</h3>
                  <p className="text-sm">{place.mostVisitPlaceAddress}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="bg-opacity-80 p-2 rounded-lg">{place.mostVisitPlaceDescription}</p>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                    onClick={() => openLocation(place.mostVisitPlaceName)}
                  >
                    <FaMapMarkerAlt className="text-red-500" size={20} />
                  </button>
                  <button
                    className="p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                    onClick={() => shareService(place)}
                  >
                    <FaShareAlt className="text-blue-600" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center items-center">
            <img
              src={logo}
              alt="No places available"
              className="w-96 h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommended;
