import { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import TripPage from "../Pages/Trippage";
import logo from "../assets/tripPageImg.png";

const TripExplore = () => {
    const [selectedOption, setSelectedOption] = useState("Trip");
    const [destination, setDestination] = useState("Haridwar");
    const [persons, setPersons] = useState("5");
    const [budget, setBudget] = useState("5000");
    const [days, setDays] = useState("5");

    const navigate = useNavigate();

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
            {/* Background Section */}
            <div
                className="relative w-full h-[80vh] bg-cover bg-center text-white flex flex-col items-center justify-center px-4 pb-10 sm:pb-16"
                style={{ backgroundImage: `url(${logo})` }}
            >
                {/* Title */}
                <div className="text-center mt-10">
                    <h1 className="text-2xl sm:text-4xl font-bold text-black">
                        🏝️ Your journey, your story—start exploring today!
                    </h1>
                    <p className="text-md sm:text-lg mt-2 text-blue-800">
                        Travel smart, travel happy!
                    </p>
                </div>

                {/* Options Section */}
                <div className="relative flex flex-wrap sm:flex-nowrap lg:flex-row justify-center bg-white rounded-lg  p-2 gap-2 sm:gap-4 text-black mt-4 sm:mt-6 w-auto max-w-md lg:max-w-full overflow-x-auto h-[12%]">
                    {["FullTrip", "Hotel", "Restaurant", "Trip", "Travel"].map((option) => (
                        <button
                            key={option}
                            className={`px-3 sm:px-4 py-1 rounded-md text-sm font-medium ${selectedOption === option
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => handleOptionChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-lg  flex flex-wrap items-center gap-2 sm:gap-4 w-[95%] sm:w-[80%] max-w-4xl text-black mt-1 h-[15%] pb-2 pt-2 pl-4 pr-4">
                    {/* Destination */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 w-full sm:w-auto">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="outline-none w-full text-sm"
                            placeholder="Enter Destination"
                        />
                        <p className="text-[10px] font-semibold">Destination</p>
                    </div>

                    {/* Persons */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 w-full sm:w-auto">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="number"
                            value={persons}
                            onChange={(e) => setPersons(e.target.value)}
                            min="1"
                            max="100"
                            className="outline-none w-full text-sm"
                        />
                        <p className="text-[12px] font-semibold">Persons</p>
                    </div>

                    {/* Days */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 w-full sm:w-auto">
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <input
                            type="number"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            min="1"
                            max="100"
                            className="outline-none w-full text-sm"
                        />
                        <p className="text-[12px] font-semibold">Days</p>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 w-full sm:w-auto">
                        <BiRupee className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="outline-none w-full text-sm"
                        />
                        <p className="text-[12px] font-semibold">Budget</p>
                    </div>

                    {/* Search Button */}
                    <form onSubmit={handleSearch} className="w-full sm:w-auto">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center justify-center w-full sm:w-auto"
                        >
                            <FaSearch className="mr-2" /> Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Trip Page */}
            <TripPage />
        </>
    );
};

export default TripExplore;
