import  { useEffect, useState } from 'react';
import TravelDetailCard from '../card-details/TravelDetailCard';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import travel from '../assets/Travel.jpg';

function TravelPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userLocation = params.get("location") || "Haridwar";
    const destinationLocation = params.get("destinationLocation") || "Delhi";
    const date = params.get("date") || new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const [travelDetails, setTravelDetails] = useState([]);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.post(`${baseUrl}/travel/details`, {
                    "fromDes": userLocation,
                    "toDes": destinationLocation,
                    "date": date
                }, { headers: { "Content-Type": "application/json" } }
                );
                if (response.status === 200)
                    setTravelDetails(response.data);
            } catch (e) {
                toast.error("Error occured in fetch details : ", e);
            }
        }
        fetchDetails();
    }, [location, destinationLocation, date]);

    return (
        <div>
            <div className="px-6">
                <h1 className="text-center text-3xl font-bold my-6 text-blue-500">
                    TRAVEL SERVICE
                </h1>

                {travelDetails.length > 0 ? (
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
                    <TravelDetailCard title={"Travel"}
                        images={travel}
                        description={"No Description"}
                        timing={"No Timing"}
                        date={date}
                        location={userLocation}
                        destinationLocation={destinationLocation}
                        price={"No ticket Price"} />
                )}
            </div>
        </div>
    );
}

export default TravelPage;    