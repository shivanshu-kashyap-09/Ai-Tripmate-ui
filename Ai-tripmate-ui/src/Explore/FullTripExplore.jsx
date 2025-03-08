import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import logo  from "../assets/logo.jpg";
import ServiceDetailCard from "../card-details/ServiceDetailCard";

const FullTripExplore = () => {
    const [destination, setDestination] = useState("New Delhi");
    const [dateRange, setDateRange] = useState({ checkIn: "Thu 6 Mar", checkOut: "Fri 7 Mar" });
    const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 2 });
    const [isEntireHome, setIsEntireHome] = useState(false);
    const [isLookingForFlights, setIsLookingForFlights] = useState(false);

    return (
        <>
        <div className="relative w-full h-[400px] bg-cover bg-center text-white flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${logo})` }}>
            <div className="text-center">
                <h1 className="text-4xl font-bold">A place to call home on your next adventure</h1>
                <p className="text-lg mt-2">Discover dreamy villas, houses, cabins & more</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
                    Find yours
                </button>
            </div>

            {/* Search Bar */}
            <div className="absolute bottom-10 bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center gap-4 w-[80%] max-w-4xl text-black">
                {/* Destination */}
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="outline-none w-full"
                    />
                </div>

                {/* Date Picker */}
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        value={`${dateRange.checkIn} - ${dateRange.checkOut}`}
                        className="outline-none w-full"
                        readOnly
                    />
                </div>

                {/* Guests & Rooms */}
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1">
                    <FaUser className="text-gray-500 mr-2" />
                    <span className="w-full">{`${guests.adults} adults · ${guests.children} children · ${guests.rooms} rooms`}</span>
                </div>

                {/* Search Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                    <FaSearch className="mr-2" /> Search
                </button>
            </div>

            {/* Extra Options */}
            <div className="absolute bottom-[-40px] flex gap-4">
                <label className="flex items-center text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={isEntireHome}
                        onChange={() => setIsEntireHome(!isEntireHome)}
                        className="mr-2"
                    />
                    I'm looking for an entire home or apartment
                </label>
                <label className="flex items-center text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={isLookingForFlights}
                        onChange={() => setIsLookingForFlights(!isLookingForFlights)}
                        className="mr-2"
                    />
                    I'm looking for flights
                </label>
            </div>
        </div>
        <ServiceDetailCard/>
        <ServiceDetailCard/>
        <ServiceDetailCard/>
        <ServiceDetailCard/>
        <ServiceDetailCard/>
        </>
    );
};

export default FullTripExplore;
