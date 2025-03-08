import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/restaurantBg.jpg";
import { useNavigate } from "react-router-dom";
import RestaurantPage from "../Pages/RestaurantPage";

const RestaurantExplore = () => {
    const [selectedOption, setSelectedOption] = useState("Restaurant");
    const [destination, setDestination] = useState("Haridwar");
    const [budget, setBudget] = useState("5000");
    const [showDropdownList, setShowDropdownList] = useState(false);

    const navigate = useNavigate();

    const budgetOptions = [
        "≤ 1000", "1000 - 2000", "2000 - 3000", "3000 - 4000",
        "4000 - 5000", "5000 - 6000", "6000 - 7000", "7000 - 8000",
        "8000 - 9000", "9000 - 10000", "10000 ≤", "Custom"
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/restaurantexplore?destination=${destination}&budget=${budget}`);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        navigate(`/${option.toLowerCase()}explore`);
    };

    return (
        <>
            <div className="relative w-full h-[400px] bg-cover bg-center text-white flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${logo})`, position: "relative", zIndex: 1 , opacity:1 }}>
                    {/* <div className="absolute inset-0 bg-white opacity-25 z-0"></div> */}
                <div className="text-center mt-25">
                    <h1 className="text-4xl font-bold text-black">🍽️ Taste the Love in Every Bite!</h1>
                    <p className="text-lg mt-2 text-black">🌿 Fresh, Flavorful, and Full of Life!</p>
                </div>

                {/* Options */}
                <div className="flex bg-white rounded-lg shadow-lg p-2 space-x-4 text-black mt-8">
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
                <div className="absolute bottom-0 bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center gap-4 w-[80%] max-w-4xl text-black">

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
            <RestaurantPage />
        </>
    );
};
export default RestaurantExplore