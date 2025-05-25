import { useRef, useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
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
    const [numPersons, setNumPersons] = useState(2);
    const [budget, setBudget] = useState(5000);
    const [showPersonDropdown, setShowPersonDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const locationPickerRef = useRef(null);
    const datePickerRef = useRef(null);
    const personBudgetRef = useRef(null);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        navigate(
            `/fulltripexplore?from=${destination.fromDes}&to=${destination.toDes}&budget=${budget}&persons=${numPersons}&checkIn=${dateRange.checkIn?.toISOString()}&checkOut=${dateRange.checkOut?.toISOString()}`
        );
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        navigate(`/${option.toLowerCase()}explore`);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locationPickerRef.current && !locationPickerRef.current.contains(event.target)) {
                setShowDestination(false);
            }
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
            if (personBudgetRef.current && !personBudgetRef.current.contains(event.target)) {
                setShowPersonDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isSearchDisabled = !destination.fromDes || !destination.toDes || !dateRange.checkIn || !dateRange.checkOut;

    return (
        <>
            {/* Background Section */}
            <div
                className="relative w-full h-[80vh] bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
                style={{ backgroundImage: `url(${logo})` }}
            >
                <div className="text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-black">
                        Your Journey, Our Passion – Explore, Experience, Enjoy! ✨🌍
                    </h1>
                    <p className="text-md sm:text-lg mt-2 text-blue-700">
                        Discover dreamy villas, houses, cabins & more
                    </p>
                </div>

                {/* Tabs */}
                <div className="relative flex flex-wrap lg:flex-row justify-center bg-white rounded-lg p-2 gap-2 sm:gap-4 text-black mt-9 sm:mt-8 w-full lg:w-auto max-w-md lg:max-w-full overflow-x-auto">
                    {["FullTrip", "Hotel", "Restaurant", "Trip", "Travel"].map((option) => (
                        <button
                            key={option}
                            className={`px-3 sm:px-4 py-1 rounded-md text-sm font-medium ${selectedOption === option ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => handleOptionChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Search Inputs */}
                <div className="mt-1 bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full max-w-4xl text-black">
                    {/* Destination Input */}
                    <div
                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[180px] relative cursor-pointer"
                        onClick={() => setShowDestination(!showDestination)}
                    >
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <span className="w-full">{`${destination.fromDes} to ${destination.toDes}`}</span>
                        <IoIosArrowDown className="text-gray-500" />

                        {showDestination && (
                            <div
                                ref={locationPickerRef}
                                className="absolute top-12 left-0 bg-white shadow-lg p-4 z-50 rounded-md w-60"
                            >
                                <p className="text-sm font-medium">Select From & To Destination</p>
                                <div className="mt-2 space-y-2">
                                    <div className="flex justify-between">
                                        <span>From</span>
                                        <input
                                            type="text"
                                            className="border px-2 rounded-md w-40"
                                            defaultValue={destination.fromDes}
                                            id="fromInput"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <span>To</span>
                                        <input
                                            type="text"
                                            className="border px-2 rounded-md w-40"
                                            defaultValue={destination.toDes}
                                            id="toInput"
                                            onClick={(e) => e.stopPropagation()}
                                        />
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
                    <div
                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[180px] relative cursor-pointer"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <span className="w-full">
                            {dateRange.checkIn ? dateRange.checkIn.toLocaleDateString() : "Check-in"} -
                            {dateRange.checkOut ? dateRange.checkOut.toLocaleDateString() : "Check-out"}
                        </span>
                        <IoIosArrowDown className="text-gray-500" />

                        {showDatePicker && (
                            <div
                                ref={datePickerRef}
                                className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg z-50 rounded-md 
                overflow-x-auto flex flex-row gap-0"
                            >
                                <div className="min-w-[200px] max-w-[90vw] max-h-[60vh] overflow-auto pl-2 pr-2">
                                    <DatePicker
                                        selected={dateRange.checkIn}
                                        onChange={(date) => setDateRange({ ...dateRange, checkIn: date })}
                                        selectsStart
                                        startDate={dateRange.checkIn}
                                        endDate={dateRange.checkOut}
                                        inline
                                    />
                                </div>
                                <div className="min-w-[250px] max-w-[90vw] max-h-[60vh] overflow-auto">
                                    <DatePicker
                                        selected={dateRange.checkOut}
                                        onChange={(date) => setDateRange({ ...dateRange, checkOut: date })}
                                        selectsEnd
                                        startDate={dateRange.checkIn}
                                        endDate={dateRange.checkOut}
                                        inline
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Persons Input */}
                    <div
                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[180px] relative cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPersonDropdown(true);
                        }}
                    >
                        <FaUser className="text-gray-500 mr-2" />
                        <span className="w-full">{persons}</span>
                        <IoIosArrowDown className="text-gray-500" />
                        {showPersonDropdown && (
                            <div
                                ref={personBudgetRef}
                                className="absolute top-12 left-0 bg-white shadow-lg p-4 z-50 rounded-md w-60"
                            >
                                <p className="text-sm font-medium">Select Persons & Budget</p>
                                <div className="mt-2 space-y-2">
                                    <input
                                        type="number"
                                        className="w-full border px-2 py-1 rounded-md"
                                        min="1"
                                        defaultValue={numPersons}
                                        id="PersonsInput"
                                    />
                                    <input
                                        type="number"
                                        className="w-full border px-2 py-1 rounded-md"
                                        min="500"
                                        defaultValue={budget}
                                        id="BudgetInput"
                                    />
                                    <button
                                        className="w-full bg-blue-500 text-white py-1 mt-3 rounded-md"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const personVal = parseInt(document.getElementById("PersonsInput").value);
                                            const budgetVal = parseInt(document.getElementById("BudgetInput").value);
                                            setNumPersons(personVal);
                                            setBudget(budgetVal);
                                            setPersons(`${personVal} Persons · ${budgetVal} Budget`);
                                            setShowPersonDropdown(false);
                                        }}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <form onSubmit={handleSearch} className="w-full sm:w-auto">
                        <button
                            type="submit"
                            disabled={isSearchDisabled || loading}
                            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center w-full sm:w-auto justify-center ${(isSearchDisabled || loading) && "opacity-50 cursor-not-allowed"
                                }`}
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                            ) : (
                                <FaSearch className="mr-2" />
                            )}
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>
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
