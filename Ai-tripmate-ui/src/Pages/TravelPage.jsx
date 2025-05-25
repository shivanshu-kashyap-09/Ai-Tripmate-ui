import { useEffect, useState } from 'react';
import TravelDetailCard from '../card-details/TravelDetailCard';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import travel from '../assets/Travel.jpg';
import { FaSpinner } from 'react-icons/fa';

function TravelPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("destination") || params.get("from") || "Haridwar";
  const destinationLocation = params.get("destinationLocation") || params.get("to") || "Delhi";
  const date = params.get("date") || params.get("checkIn") || params.get("checkOut") || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [travelDetails, setTravelDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/travel/details`,
          {
            fromDes: userLocation,
            toDes: destinationLocation,
            date: date,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200 && Array.isArray(response.data)) {
          setTravelDetails(response.data);
        } else {
          setTravelDetails([]);
          toast.warn("No travel data found.");
        }
      } catch (e) {
        console.error("Fetch error:", e);
        toast.error(`Error fetching travel details: ${e.message || e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [location, destinationLocation, date]);

  return (
    <div className="px-6">
      <h1 className="text-center text-3xl font-bold my-6 text-blue-500">
        TRAVEL SERVICE
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
          <p className="ml-2 text-lg">Fetching travel details...</p>
        </div>
      ) : travelDetails.length > 0 ? (
        travelDetails.map((travel, index) => (
          <TravelDetailCard
            key={index}
            title={travel.travelName || "travel"}
            images={travel.travelImage || travel}
            description="Exciting travel experience"
            duration={travel.travelDuration || "duration"}
            timing={travel.travelStartTime || "time"}
            date={date}
            location={userLocation}
            destinationLocation={destinationLocation}
            price={travel.travelTicket}
          />
        ))
      ) : (
        <TravelDetailCard
          title={"Travel"}
          images={travel}
          description={"No Description"}
          timing={"No Timing"}
          date={date}
          location={userLocation}
          destinationLocation={destinationLocation}
          price={"No ticket Price"}
        />
      )}
    </div>
  );
}

export default TravelPage;
