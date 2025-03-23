import React, { useEffect, useState } from 'react';
import TravelDetailCard from '../card-details/TravelDetailCard';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import logo2 from '../assets/logo.jpg'
import travel from '../assets/travel.jpg';

function TravelPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userLocation = params.get("location") || "Haridwar";
    const destinationLocation = params.get("destinationLocation") || "Delhi";
    const date = params.get("date") || new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const [travelDetails, setTravelDetails] = useState([]);

    const [trainName, setTrainName] = useState([]);
    const [trainTravelTime, setTrainTravelTime] = useState([]);
    const [trainTravelDuration, setTrainTravelDuration] = useState([]);
    const [trainTicket, setTrainTicket] = useState([]);

    const [busName, setBusName] = useState([]);
    const [busTravelTime, setBusTravelTime] = useState([]);
    const [busTravelDuration, setBusTravelDuration] = useState([]);
    const [busTicket, setBusTicket] = useState([]);

    const [cabeName, setCabeName] = useState([]);
    const [cabeTravelDuration, setCabeTravelDuration] = useState([]);
    const [cabeTicket, setCabeTicket] = useState([]);

    const [flightName, setFlightName] = useState([]);
    const [flightTravelTime, setFlightTravelTime] = useState([]);
    const [flightTravelDuration, setFlightTravelDuration] = useState([]);
    const [flightTicket, setFlightTicket] = useState([]);

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
            } catch (error) {
                toast.error("Error occured in fetch details : ", e);
            }
        }
        fetchDetails();
    }, [location, destinationLocation, date]);

    // useEffect(() => {
    //     const fetchName = async () => {
    //         try {
    //             const responseBus = await axios.post(`${baseUrl}/travel/bus/name`, {
    //                 "fromDes": userLocation,
    //                 "toDes": destinationLocation,
    //                 "date": date
    //             }, { headers: { "Content-Type": "application/json" } });

    //             if (responseBus.status === 200) {
    //                 const data = JSON.parse(responseBus.data.body);

    //                 if (data.busName && Array.isArray(data.busName)) {
    //                     if (data.busName.length > 0) {
    //                         setBusName(data.busName);
    //                     } else {
    //                         toast.error("No buses found for the selected route.");
    //                     }
    //                 } else {
    //                     toast.error("Invalid bus data format.");
    //                 }
    //             } else {
    //                 toast.error("bus not found");
    //             }
    //             const responseTrain = await axios.post(`${baseUrl}/travel/train/name`, {
    //                 "fromDes": userLocation,
    //                 "toDes": destinationLocation,
    //                 "date": date
    //             }, { headers: { "Content-Type": "application/json" } });

    //             if (responseTrain.status === 200) {
    //                 console.log("API Response:", responseTrain.data);
    //                 const data = typeof responseTrain.data.body === "string"
    //                     ? JSON.parse(responseTrain.data.body)
    //                     : responseTrain.data.body;

    //                 if (data.trainName && Array.isArray(data.trainName)) {
    //                     if (data.trainName.length > 0) {
    //                         setTrainName(data.trainName);
    //                     } else {
    //                         toast.error("No train found for the selected route.");
    //                     }
    //                 } else {
    //                     toast.error("Invalid train data format.");
    //                 }
    //             } else {
    //                 toast.error("Train not found");
    //             }

    //             const responseCabe = await axios.post(`${baseUrl}/travel/cabe/name`, {
    //                 "fromDes": userLocation,
    //                 "toDes": destinationLocation,
    //                 "date": date
    //             }, { headers: { "Content-Type": "application/json" } });

    //             if (responseCabe.status === 200) {
    //                 console.log("API Response:", responseCabe.data);
    //                 const data = JSON.parse(responseCabe.data.body);
    //                 if (data.cabeName && Array.isArray(data.cabeName)) {
    //                     setCabeName(data.cabeName);
    //                 } else {
    //                     toast.error("Invalid cabe data format.");
    //                 }
    //             } else {
    //                 toast.error("cabe not found");
    //             }
    //             const responseFlight = await axios.post(`${baseUrl}/travel/flight/name`, {
    //                 "fromDes": userLocation,
    //                 "toDes": destinationLocation,
    //                 "date": date
    //             }, { headers: { "Content-Type": "application/json" } });

    //             if (responseFlight.status === 200) {
    //                 console.log("API Response:", responseFlight.data);
    //                 const data = JSON.parse(responseFlight.data.body);
    //                 if (data.flightName && Array.isArray(data.flightName)) {
    //                     setFlightName(data.flightName);
    //                 } else {
    //                     toast.error("Invalid flight data format.");
    //                 }
    //             } else {
    //                 toast.error("flight not found");
    //             }
    //         } catch (error) {
    //             toast.error("Error fetching flight names!");
    //         }
    //     };
    //     fetchName();
    // }, [location, destinationLocation, date]);

    // useEffect(() => {
    //     if (trainName.length === 0) return;

    //     const fetchTrainDetails = async () => {
    //         try {
    //             const requests = trainName.map((train) =>
    //                 Promise.all([
    //                     axios.post(`${baseUrl}/travel/train/time/${train}`, {
    //                         fromDes: userLocation,
    //                         toDes: destinationLocation,
    //                         date: date,
    //                     }, { headers: { "Content-Type": "application/json" } }),
    //                     axios.post(`${baseUrl}/travel/train/travel-time/${train}`, {
    //                         fromDes: userLocation,
    //                         toDes: destinationLocation,
    //                         date: date,
    //                     }, { headers: { "Content-Type": "application/json" } }),
    //                     axios.post(`${baseUrl}/travel/train/ticket/${train}`, {
    //                         fromDes: userLocation,
    //                         toDes: destinationLocation,
    //                         date: date,
    //                     }, { headers: { "Content-Type": "application/json" } })
    //                 ])
    //             );

    //             const responses = await Promise.all(requests);

    //             setTrainTravelTime(responses.map(([timeRes]) => timeRes.data.body.body));
    //             setTrainTravelDuration(responses.map(([_, durationRes]) => durationRes.data.body.body));
    //             setTrainTicket(responses.map(([_, __, ticketRes]) => ticketRes.data.body.body));

    //         } catch (error) {
    //             console.error("Error fetching train details:", error);
    //         }
    //     };

    //     fetchTrainDetails();
    // }, [trainName, userLocation, destinationLocation, date]);

    // useEffect(() => {
    //     if (busName.length == 0) return;
    //     const fetchBus = async () => {
    //         try {
    //             for (let i = 0; i < busName.length; i++) {
    //                 const responseTravelTime = await axios.post(`${baseUrl}/travel/bus/time/${busName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });

    //                 const responseTravelDuration = await axios.post(`${baseUrl}/travel/bus/travel-time/${busName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });

    //                 const responseTicket = await axios.post(`${baseUrl}/travel/bus/ticket/${busName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });

    //                 if (responseTravelDuration.status === 200) {
    //                     setBusTravelDuration((prev) => [...prev, responseTravelDuration.data.body.body]);
    //                 }
    //                 if (responseTravelTime.status === 200) {
    //                     setBusTravelTime((prev) => [...prev, responseTravelTime.data.body.body]);
    //                 }
    //                 if (responseTicket.status === 200) {
    //                     setBusTicket((prev) => [...prev, responseTicket.data.body.body]);
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchBus();
    // }, [busName, useLocation, destinationLocation, date])

    // useEffect(() => {
    //     if (cabeName.length == 0) return;
    //     const fetchCabe = async () => {
    //         try {
    //             for (let i = 0; i < cabeName.length; i++) {
    //                 const responseTravelDuration = await axios.post(`${baseUrl}/travel/cabe/travel-time/${cabeName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });

    //                 const responseTicket = await axios.post(`${baseUrl}/travel/cabe/ticket/${cabeName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });
    //                 if (responseTravelDuration.status === 200) {
    //                     setCabeTravelDuration((prev) => [...prev, responseTravelDuration.data.body.body]);
    //                 }
    //                 if (responseTicket.status === 200) {
    //                     setCabeTicket((prev) => [...prev, responseTicket.data.body.body]);
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchCabe();
    // }, [cabeName, useLocation, destinationLocation, date]);

    // useEffect(() => {
    //     if (flightName.length === 0) return;
    //     const fetchFlight = async () => {
    //         try {
    //             for (let i = 0; i < flightName.length; i++) {
    //                 const responseTravelTime = await axios.post(`${baseUrl}/travel/flight/time/${flightName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });
    //                 const responseTicket = await axios.post(`${baseUrl}/travel/flight/ticket/${flightName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });
    //                 const responseTravelDuration = await axios.post(`${baseUrl}/travel/flight/travel-time/${flightName[i]}`, {
    //                     "fromDes": userLocation,
    //                     "toDes": destinationLocation,
    //                     "date": date
    //                 }, { headers: { "Content-Type": "application/json" } });
    //                 if (responseTravelTime.status === 200) {
    //                     setFlightTravelTime((prev) => [...prev, responseTravelTime.data.body.body]);
    //                 }
    //                 if (responseTicket.status === 200) {
    //                     setFlightTicket((prev) => [...prev, responseTicket.data.body.body]);
    //                 }
    //                 if (responseTravelDuration.status === 200) {
    //                     setFlightTravelDuration((prev) => [...prev, responseTravelDuration.data.body.body]);
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchFlight();
    // }, [flightName, useLocation, destinationLocation, date]);

    return (
        <div>
            <div className="px-6">
                <h1 className="text-center text-3xl font-bold my-6 text-blue-500">
                    TRAVEL SERVICE
                </h1>

                {/* Render all trains with their details */}
                {travelDetails.map((travel, index) => (
                    <TravelDetailCard
                        key={index}
                        title={travel.exploreName || "Train1"}
                        images={travel.image}
                        description="Exciting travel experience"
                        duration={travel.travelTime || "Train travel duration not found"}
                        timing={travel.time || "Train travel time not found"}
                        date={date}
                        location={userLocation}
                        destinationLocation={destinationLocation}
                        price={travel.ticket || "Train ticket price not found."}
                    />
                ))}

                {/* {busName.map((bus, index) => (
                    <TravelDetailCard
                        key={index}
                        title={bus || "bus1"}
                        images={[logo2, logo2, logo2]}
                        description="Exciting travel experience"
                        duration={busTravelDuration[index] || "bus travel duration not found"}
                        timing={busTravelTime[index] || "bus travel time not found"}
                        date={date}
                        location={userLocation}
                        destinationLocation={destinationLocation}
                        price={busTicket[index] || "bus ticket price not found."}
                    />
                ))}

                {cabeName.map((cabe, index) => (
                    <TravelDetailCard
                        key={index}
                        title={cabe || "cabe1"}
                        images={[logo2, logo2, logo2]}
                        description="Exciting travel experience"
                        duration={cabeTravelDuration[index] || "cabe travel duration not found"}
                        timing={"N/A"}
                        date={date}
                        location={userLocation}
                        destinationLocation={destinationLocation}
                        price={cabeTicket[index] || "cabe ticket price not found."}
                    />
                ))}
                {flightName.map((flight, index) => (
                    <TravelDetailCard
                        key={index}
                        title={flight || "flight1"}
                        images={[logo2, logo2, logo2]}
                        description="Exciting travel experience"
                        duration={flightTravelDuration[index] || "flight travel duration not found"}
                        timing={flightTravelTime[index] || "flight travel time not found"}
                        date={date}
                        location={userLocation}
                        destinationLocation={destinationLocation}
                        price={flightTicket[index] || "flight ticket price not found."}
                    />
                ))} */}

            </div>
        </div>
    );
}

export default TravelPage;    