import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import trip from "../assets/Trip.png";
import { FaSpinner } from "react-icons/fa";

function TripPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("destination") || params.get("to") || "Haridwar";
  const userBudget = params.get("budget") || params.get("budget") || "5000";
  const userPeople = params.get("people") || params.get("persons") || "5";
  const checkInParam = params.get("checkIn");
  const checkOutParam = params.get("checkOut");

  let userDays = "5";

  if (checkInParam && checkOutParam) {
    const checkInDate = new Date(checkInParam);
    const checkOutDate = new Date(checkOutParam);

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (!isNaN(dayDiff) && dayDiff > 0) {
      userDays = dayDiff.toString();
    }
  }else if(params.get("days")) userDays = params.get("days");

  const [tripDetails, setTripDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/trip/details`, {
          city: userLocation,
          budget: userBudget,
          days: userDays,
          person: userPeople
        }, {
          headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setTripDetails(response.data);
        } else {
          setTripDetails([]);
          toast.warn("No trip data found.");
        }
      } catch (e) {
        console.error("Trip fetch error:", e);
        toast.error(`Error fetching trip details: ${e.message || e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userLocation, userBudget, userDays, userPeople]);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-4 text-blue-500">
          TRIP SERVICE
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-3xl text-blue-600" />
            <p className="ml-2 text-lg">Fetching trip details...</p>
          </div>
        ) : tripDetails.length > 0 ? (
          tripDetails.map((tripDetail, index) => (
            <div key={index}>
              <ServiceDetailCard
                title={tripDetail.locationName || "Location"}
                images={tripDetail.locationImage || trip}
                description={tripDetail.locationDescription || "No description available"}
                location={userLocation}
                mapLocation={`${tripDetail.locationName} ${userLocation}`}
                price={tripDetail.locationVisitPrice || "No price range available"}
                rating={tripDetail.locationRating || "No rating available."}
              />
            </div>
          ))
        ) : (
          <ServiceDetailCard
            title={"Location"}
            images={trip}
            description={"No description available"}
            location={userLocation}
            mapLocation={userLocation}
            price={"No price range available"}
            rating={"No Rating available."}
          />
        )}
      </div>
    </div>
  );
}

export default TripPage;
