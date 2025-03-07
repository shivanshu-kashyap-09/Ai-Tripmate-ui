import React, { useEffect, useState } from 'react'; 
import Header from '../common-components/Header';
import TravelDetailCard from '../card-details/TravelDetailCard';
import { useLocation } from "react-router-dom";
import Footer from '../common-components/Footer';
import hellojava from "../assets/hellojava.png";
import { toast } from 'react-toastify';
import axios from 'axios';

function TravelPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userLocation = params.get("location") || "Unknown Location";  
    const destinationLocation = params.get("destinationLocation") || "Unknown Destination"; 
    const date = params.get("date") || "No Date"; 

    const [trainName, setTrainName] = useState([]);
    const [trainTravelTime, setTrainTravelTime] = useState([]);
    const [trainTravelDuration, setTrainTravelDuration] = useState([]);
    const [trainTicket, setTrainTicket] = useState([]);

    // Fetch Train Names
    useEffect(() => {
        const fetchTrainName = async () => {
            try {
                const response = await axios.post("http://tomcat.localhost:8080/travel/train/name", {
                    "fromDes": userLocation,
                    "toDes": destinationLocation,
                    "date": date
                }, { headers: { "Content-Type": "application/json" } });

                if (response.status === 200) {
                    const data = JSON.parse(response.data.body);
                    if (data.train && Array.isArray(data.train)) {
                        setTrainName(data.train);
                    } else {
                        toast.error("Invalid train data format.");
                    }
                } else {
                    toast.error("Train not found");
                }
            } catch (error) {
                toast.error("Error fetching train names!");
            }
        };
        fetchTrainName();
    }, [location, destinationLocation, date]);

    // Fetch Train Travel Time (after trainName is set)
    useEffect(() => {
        if (trainName.length === 0) return;

        const fetchTrainTravelTime = async () => {
            try {
                let times = [];
                for (const train of trainName) {
                    const response = await axios.post(`http://tomcat.localhost:8080/travel/train/time/${train}`, {
                        "fromDes": userLocation,
                        "toDes": destinationLocation,
                        "date": date
                    }, { headers: { "Content-Type": "application/json" } });

                    if (response.status === 200 && response.data.body?.body) {
                        times.push(response.data.body.body);
                    } else {
                        times.push("Train time not found.");
                    }
                }
                setTrainTravelTime(times);
            } catch (error) {
                toast.error("Error fetching train travel time!");
            }
        };
        fetchTrainTravelTime();
    }, [trainName]);

    // Fetch Train Travel Duration (after trainTravelTime is set)
    useEffect(() => {
        if (trainTravelTime.length === 0) return;

        const fetchTrainTravelDuration = async () => {
            try {
                let durations = [];
                for (const train of trainName) {
                    const response = await axios.post(`http://tomcat.localhost:8080/travel/train/travel-time/${train}`, {
                        "fromDes": userLocation,
                        "toDes": destinationLocation,
                        "date": date
                    }, { headers: { "Content-Type": "application/json" } });

                    if (response.status === 200 && response.data.body?.body) {
                        durations.push(response.data.body.body);
                    } else {
                        durations.push("Train travel duration not found.");
                    }
                }
                setTrainTravelDuration(durations);
            } catch (error) {
                toast.error("Error fetching train travel duration!");
            }
        };
        fetchTrainTravelDuration();
    }, [trainTravelTime]);

    // Fetch Train Ticket Prices (after trainTravelDuration is set)
    useEffect(() => {
        if (trainTravelDuration.length === 0) return;

        const fetchTrainTicket = async () => {
            try {
                let tickets = [];
                for (const train of trainName) {
                    const response = await axios.post(
                        `http://tomcat.localhost:8080/travel/train/ticket/${train}`,
                        {
                            fromDes: userLocation,
                            toDes: destinationLocation,
                            date: date,
                        },
                        { headers: { "Content-Type": "application/json" } }
                    );

                    if (response.status === 200 && response.data.body?.body) {
                        tickets.push(response.data.body.body)
                    } else {
                        tickets.push("Train ticket price not found.");
                    }
                }
                setTrainTicket(tickets);
            } catch (error) {
                toast.error("Error fetching train ticket!");
            }
        };
        fetchTrainTicket();
    }, [trainTravelDuration]);

    return (
        <div>
            <Header />
            <div className="mt-20 px-6">
                <h1 className="text-center text-3xl font-bold my-6">
                    Travel from {userLocation} to {destinationLocation}
                </h1>
                
                {/* Render all trains with their details */}
                {trainName.map((train, index) => (
                    <TravelDetailCard 
                        key={index}
                        title={train || "Train1"}
                        images={[hellojava, hellojava, hellojava]}
                        description="Exciting travel experience"
                        duration={trainTravelDuration[index] || "Train travel duration not found"}
                        timing={trainTravelTime[index] || "Train travel time not found"}
                        date={date}
                        location={userLocation}  
                        destinationLocation={destinationLocation} 
                        price={trainTicket[index] || "Train ticket price not found."}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default TravelPage;    