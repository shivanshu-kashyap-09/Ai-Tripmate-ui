import { FaShareAlt, FaMapMarkerAlt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TravelDetailCard = ({ title, images, description, duration, timing, location, destinationLocation, date, price }) => {
  const openGoogleMaps = () => {
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(location)}&destination=${encodeURIComponent(destinationLocation)}`;
    window.open(googleMapsURL, "_blank");
  };

  const shareService = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Check out this service: ${title}`,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <section className="py-5 bg-gray-100 w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg flex h-[350px] flex-col md:flex-row w-full md:w-4/5 overflow-hidden border border-gray-300">
        <div className="w-full md:w-1/3 relative">
          <img src={images} alt="Service" className="w-full h-56 md:h-80 object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>

            <div className="mt-3">
              <p className="font-medium text-gray-700">
                Duration: <span className="text-gray-900">{duration}</span>
              </p>
            </div>

            <div className="mt-2">
              <p className="font-medium text-gray-700">
                Timing: <span className="text-gray-900">{timing}</span>
              </p>
              <p className="font-medium text-gray-700">
                Date: <span className="text-gray-900">{date}</span>
              </p>
            </div>

            <div className="flex items-center mt-4 text-gray-700">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{location} → {destinationLocation}</span>
            </div>
          </div>

          {/* Price and Buttons Inline */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-semibold text-blue-500">{price}</span>
            
            <div className="flex gap-3">
              <button onClick={shareService} className="p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <FaShareAlt className="text-blue-600" size={20} />
              </button>
              <button onClick={openGoogleMaps} className="p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <FaMapMarkerAlt className="text-red-500" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelDetailCard;
