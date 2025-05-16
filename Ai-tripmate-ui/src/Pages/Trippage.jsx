import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import trip from "../assets/trip.png";

function TripPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Haridwar";
  const userBudget = params.get("budget") || "5000";
  const userPeople = params.get("people") || "5";
  const userDays = params.get("days") || "5";

  const [tripDetails, setTripDetails] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${baseUrl}/trip/details`, {
          city: userLocation, budget: userBudget, days: userDays, person: userPeople
        }, { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200)
          setTripDetails(response.data);
      } catch (e) {
        toast.error("Error occured in fetch details : ", e);
      }
    }
    fetchDetails();
  }, []);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-4 text-blue-500">
          TRIP SERVICE</h1>
        {tripDetails.length > 0 ? (

          tripDetails.map((tripDetail, index) => (
            <div key={index}>
              <ServiceDetailCard
                title={tripDetail.locationName || "location"}
                images={tripDetail.locationImage | trip}
                description={tripDetail.locationDescription || "No description available"}
                location={userLocation}
                mapLocation={`${tripDetail.locationName} ${userLocation}`}
                price={tripDetail.locationVisitPrice || "No price range available"}
                rating={tripDetail.locationRating || "No Rating available."}
              />
            </div>
          ))
        ) : (
          <ServiceDetailCard title={"Location"}
            images={trip}
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


export default TripPage