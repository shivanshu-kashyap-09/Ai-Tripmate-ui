import { useState, useEffect } from "react";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import hotel from "../assets/Hotel.png";
import axios from "axios";
import { toast } from "react-toastify";

function HotelPage() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const userLocation = params.get("location") || "Haridwar";
  const userBudget = params.get("budget") || "5000";

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [hotelDetails, setHotelDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${baseUrl}/hotel/details`, {
          city: userLocation, budget: userBudget
        }, { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200)
          setHotelDetails(response.data);
      } catch (e) {
        toast.error("Error occured in fetch details : ", e);
      }
    }
    fetchDetails();
  }, [userLocation, userBudget]);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-4 text-blue-500">HOTEL SERVICE</h1>

        {hotelDetails.length > 0 ? (

          hotelDetails.map((hotelDetail, index) => (
            <div key={index}>
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
          <ServiceDetailCard title={"Hotel"}
            images={hotel}
            description={"No description available"}
            location={userLocation}
            mapLocation={userLocation}
            price={"No price range available"}
            rating={"No Rating available."} />

        )}
      </div>
    </div>
  )
}

export default HotelPage