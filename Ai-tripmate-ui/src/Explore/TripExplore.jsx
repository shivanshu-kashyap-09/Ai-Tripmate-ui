import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/tripBg.jpg";
import { useNavigate } from "react-router-dom";
import TripPage from "../Pages/TripPage";

const TripExplore = () => {
    const [selectedOption, setSelectedOption] = useState("Trip");
    const [destination, setDestination] = useState("Haridwar");
    const [persons, setPersons] = useState("5");
    const [showDropdown, setShowDropdown] = useState(false);
    const [budget, setBudget] = useState("5000");
    const [days, setDays] = useState("5");
    const [showDropdownDays, setShowDropdownDays] = useState(false);
    const [showDropdownList, setShowDropdownList] = useState(false);

    const navigate = useNavigate();

    const budgetOptions = [
        "≤ 1000", "1000 - 2000", "2000 - 3000", "3000 - 4000",
        "4000 - 5000", "5000 - 6000", "6000 - 7000", "7000 - 8000",
        "8000 - 9000", "9000 - 10000", "10000 ≤", "Custom"
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/tripexplore?destination=${destination}&budget=${budget}&persons=${persons}&days=${days}`);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        navigate(`/${option.toLowerCase()}explore`);
    };

    return (
        <>
            <div className="relative w-full h-[400px] bg-cover bg-center text-white flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${logo})` }}>
                <div className="text-center  mt-23">
                    <h1 className="text-4xl font-bold text-black">🏝️ Your journey, your story—start exploring today!</h1>
                    <p className="text-lg mt-2 text-blue-800">Travel smart, travel happy!</p>
                </div>
                {/* Options */}
                <div className="flex bg-white rounded-lg shadow-lg p-2 space-x-4 text-black mt-8 mb-15">
                    {["FullTrip", "Hotel", "Restaurant", "Trip", "Travel"].map((option) => (
                        <button
                            key={option}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${selectedOption === option ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => handleOptionChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {/* Search Bar */}
                <div className="absolute bottom-10 bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center gap-4 w-[80%] max-w-4xl text-black">

                    {/* Destination */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                setDestination(inputValue);
                            }}
                            className="outline-none w-full"
                        />
                    </div>

                    {/* Persons Dropdown */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 relative">
                        <FaUser className="text-gray-500 mr-2" />

                        {/* Input Field */}
                        <input
                            type="number"
                            value={persons}
                            onChange={(e) => setPersons(e.target.value)}
                            min="1"
                            max="100"
                            className="outline-none w-full bg-white"
                        />

                        {/* Dropdown Arrow */}
                        <IoIosArrowDown
                            className="text-gray-500 ml-2 cursor-pointer"
                            onClick={() => setShowDropdown(!showDropdown)}
                        />

                        {/* Dropdown List */}
                        {showDropdown && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1">
                                {[...Array(10).keys()].map((num) => (
                                    <div
                                        key={num + 1}
                                        onClick={() => {
                                            setPersons(num + 1);
                                            setShowDropdown(false);
                                        }}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {num + 1}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* days */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 relative">
                        <FaCalendarAlt className="text-gray-500 mr-2" />

                        {/* Input Field */}
                        <input
                            type="number"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            min="1"
                            max="100"
                            className="outline-none w-full bg-white"
                        />

                        {/* Dropdown Arrow */}
                        <IoIosArrowDown
                            className="text-gray-500 ml-2 cursor-pointer"
                            onClick={() => setShowDropdownDays(!showDropdown)}
                        />

                        {/* Dropdown List */}
                        {showDropdownDays && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1">
                                {[...Array(10).keys()].map((num) => (
                                    <div
                                        key={num + 1}
                                        onClick={() => {
                                            setDays(num + 1);
                                            setShowDropdownDays(false);
                                        }}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {num + 1}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Budget Dropdown */}
                    <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1">
                        <BiRupee className="text-gray-500 mr-2" />

                        {/* Input Field (Manually Editable) */}
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="outline-none w-full bg-white cursor-text"
                        />

                        {/* Dropdown Arrow */}
                        <IoIosArrowDown
                            className="text-gray-500 ml-2 cursor-pointer"
                            onClick={() => setShowDropdownList(!showDropdownList)}
                        />

                        {/* Dropdown List */}
                        {showDropdownList && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
                                {budgetOptions.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => {
                                            if (option === "Custom") {
                                                setBudget("");
                                            } else {
                                                setBudget(option);
                                            }
                                            setShowDropdownList(false);
                                        }}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <form onSubmit={handleSearch}>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                            <FaSearch className="mr-2" /> Search
                        </button>
                    </form>

                </div>
            </div>
            <TripPage />
        </>
    );
};

export default TripExplore