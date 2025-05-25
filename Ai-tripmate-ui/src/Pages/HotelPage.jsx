import { useState, useEffect } from "react";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import hotel from "../assets/Hotel.png";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

function HotelPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const userLocation = params.get("destination") || params.get("to") || "Haridwar";
  const userBudget = params.get("budget") || params.get("budget") || "5000";

  const [hotelDetails, setHotelDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/hotel/details`,
          { city: userLocation, budget: userBudget },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200 && Array.isArray(response.data)) {
          setHotelDetails(response.data);
        } else {
          toast.warn("No hotel data found.");
          setHotelDetails([]);
        }
      } catch (e) {
        console.error("Fetch error:", e);
        toast.error(`Error fetching hotel details: ${e.message || e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userLocation, userBudget]);

  return (
    <div className="px-6">
      <h1 className="text-center text-3xl font-bold my-4 text-blue-500">
        HOTEL SERVICE
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
          <p className="ml-2 text-lg">Fetching hotel details...</p>
        </div>
      ) : hotelDetails.length > 0 ? (
        hotelDetails.map((hotelDetail, index) => (
          <div key={index} className="mb-4">
            <ServiceDetailCard
              title={hotelDetail.hotelName || "Hotel"}
              images={hotelDetail.hotelImage || hotel}
              description={hotelDetail.hotelDescription || "No description available"}
              location={userLocation}
              mapLocation={`${hotelDetail.hotelName} ${userLocation}`}
              price={hotelDetail.hotelPrice || "No price range available"}
              rating={hotelDetail.hotelRating || "No Rating available."}
            />
          </div>
        ))
      ) : (
        <ServiceDetailCard
          title={"Hotel"}
          images={hotel}
          description={"No description available"}
          location={userLocation}
          mapLocation={userLocation}
          price={"No price range available"}
          rating={"No Rating available."}
        />
      )}
    </div>
  );
}

export default HotelPage;
