import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../assets/fullTripBg.jpg";
import HotelPage from "../Pages/HotelPage";
import RestaurantPage from "../Pages/RestaurantPage";
import TripPage from "../Pages/Trippage";
import TravelPage from "../Pages/TravelPage";

const FullTripExplore = () => {
    const [selectedOption, setSelectedOption] = useState("FullTrip");
    const [destination, setDestination] = useState({ fromDes: "Haridwar", toDes: "Delhi" });
    const [showDestination, setShowDestination] = useState(false);
    const [dateRange, setDateRange] = useState({ checkIn: null, checkOut: null });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [persons, setPersons] = useState("2 Persons · 5000 Budget");
    const [showPersonDropdown, setShowPersonDropdown] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/fulltripexplore?from=${destination.fromDes}&to=${destination.toDes}&budget=${budget}&persons=${persons}&checkIn=${dateRange.checkIn}&checkOut=${dateRange.checkOut}`);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        navigate(`/${option.toLowerCase()}explore`);
    };

    return (
        <>
            {/* Background Section */}
            <div className="relative w-full min-h-[400px] bg-cover bg-center text-white flex flex-col items-center justify-center px-4 py-6 sm:py-12"
                style={{ backgroundImage: `url(${logo})` }}
            >
                {/* Title */}
                <div className="text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-black">
                        Your Journey, Our Passion – Explore, Experience, Enjoy! ✨🌍
                    </h1>
                    <p className="text-md sm:text-lg mt-2 text-blue-700">
                        Discover dreamy villas, houses, cabins & more
                    </p>
                </div>

                {/* Options */}
                <div className="relative z-30 flex flex-wrap justify-center bg-white rounded-lg shadow-lg p-2 gap-2 sm:gap-4 text-black mt-4 sm:mt-6 w-auto max-w-md lg:max-w-full overflow-x-auto">
                    {["FullTrip", "Hotel", "Restaurant", "Trip", "Travel"].map((option) => (
                        <button
                            key={option}
                            className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium ${
                                selectedOption === option ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => handleOptionChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="mt-6 bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full max-w-4xl text-black">
                    
                    {/* Destination Input */}
                    <div
                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[180px] relative cursor-pointer"
                        onClick={() => setShowDestination(true)}
                    >
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <span className="w-full">{`${destination.fromDes} to ${destination.toDes}`}</span>
                        <IoIosArrowDown className="text-gray-500" />

                        {showDestination && (
                            <div className="absolute top-12 left-0 bg-white shadow-lg p-4 z-50 rounded-md w-60">
                                <p className="text-sm font-medium">Select From & To Destination</p>
                                <div className="mt-2 space-y-2">
                                    <div className="flex justify-between">
                                        <span>From</span>
                                        <input type="text" className="border px-2 rounded-md w-40" defaultValue={destination.fromDes} id="fromInput" />
                                    </div>
                                    <div className="flex justify-between">
                                        <span>To</span>
                                        <input type="text" className="border px-2 rounded-md w-40" defaultValue={destination.toDes} id="toInput" />
                                    </div>
                                    <button
                                        className="w-full bg-blue-500 text-white py-1 mt-3 rounded-md"
                                        onClick={() => {
                                            setDestination({
                                                fromDes: document.getElementById("fromInput").value,
                                                toDes: document.getElementById("toInput").value,
                                            });
                                            setShowDestination(false);
                                        }}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Date Picker */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[180px] relative cursor-pointer"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <span className="w-full">
                            {dateRange.checkIn ? dateRange.checkIn.toLocaleDateString() : "Check-in"} -
                            {dateRange.checkOut ? dateRange.checkOut.toLocaleDateString() : "Check-out"}
                        </span>
                        <IoIosArrowDown className="text-gray-500" />
                        {showDatePicker && (
                            <div className="absolute top-12 left-0 bg-white shadow-lg p-4 z-50 rounded-md flex gap-4">
                                <DatePicker selected={dateRange.checkIn} onChange={(date) => setDateRange({ ...dateRange, checkIn: date })} selectsStart startDate={dateRange.checkIn} endDate={dateRange.checkOut} inline />
                                <DatePicker selected={dateRange.checkOut} onChange={(date) => setDateRange({ ...dateRange, checkOut: date })} selectsEnd startDate={dateRange.checkIn} endDate={dateRange.checkOut} inline />
                            </div>
                        )}
                    </div>

                    {/* Persons Input */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[180px] relative cursor-pointer"
                        onClick={() => setShowPersonDropdown(true)}
                    >
                        <FaUser className="text-gray-500 mr-2" />
                        <span className="w-full">{persons}</span>
                        <IoIosArrowDown className="text-gray-500" />
                        {showPersonDropdown && (
                            <div className="absolute top-12 left-0 bg-white shadow-lg p-4 z-50 rounded-md w-60">
                                <p className="text-sm font-medium">Select Persons & Budget</p>
                                <div className="mt-2 space-y-2">
                                    <input type="number" className="w-full border px-2 py-1 rounded-md" min="2" defaultValue={2} id="PersonsInput" />
                                    <input type="number" className="w-full border px-2 py-1 rounded-md" min="500" defaultValue={5000} id="BudgetInput" />
                                    <button className="w-full bg-blue-500 text-white py-1 mt-3 rounded-md"
                                        onClick={() => {
                                            setPersons(`${document.getElementById("PersonsInput").value} Persons · ${document.getElementById("BudgetInput").value} Budget`);
                                            setShowPersonDropdown(false);
                                        }}
                                    >Done</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                        <FaSearch className="mr-2" /> Search
                    </button>
                </div>
            </div>

            <HotelPage />
            <RestaurantPage />
            <TripPage />
            <TravelPage />
        </>
    );
};

export default FullTripExplore;
