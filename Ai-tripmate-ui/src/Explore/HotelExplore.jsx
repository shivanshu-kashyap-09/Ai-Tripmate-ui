import  { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/hotelPageImg.png";
import { useNavigate } from "react-router-dom";
import HotelPage from "../Pages/HotelPage";

const HotelExplore = () => {
    const [selectedOption, setSelectedOption] = useState("Hotel");
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
        navigate(`/hotelexplore?destination=${destination}&budget=${budget}`);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        navigate(`/${option.toLowerCase()}explore`);
    };

    return (
        <>
            <div
                className="relative w-full h-[80vh] bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
                style={{ backgroundImage: `url(${logo})` }}
            >
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white ">
                        CHECK IN TO COMFORT, CHECK OUT THE VIEWS
                    </h1>
                </div>

                {/*Navigation Options*/}
                <div className="relative  flex flex-wrap sm:flex-wrap lg:flex-row justify-center bg-white rounded-lg  p-2 gap-2 sm:gap-4 text-black mt-9 sm:mt-8 w-full lg:w-auto max-w-md lg:max-w-full overflow-x-auto">
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


                {/* Search Bar*/}
                <div className="relative mt-1 bg-white rounded-lg shadow-lg  flex flex-col sm:flex-row gap-4 w-[80%] sm:w-[60%] max-w-4xl text-black pr-4 pl-4 pt-2 pb-2 ">
                    {/* Destination Input */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 w-full sm:w-auto">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="outline-none w-full"
                            placeholder="Enter destination"
                        />
                        <p>Location</p>
                    </div>

                    {/* Budget Dropdown */}
                    <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 w-full sm:w-auto">
                        <BiRupee className="text-gray-500 mr-2" />

                        {/* Input Field (Manually Editable) */}
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="outline-none w-full bg-white cursor-text"
                        />
                        <p>Budget</p>
                        {/* Dropdown Arrow */}
                        <IoIosArrowDown
                            className="text-gray-500 ml-2 cursor-pointer"
                            onClick={() => setShowDropdownList(!showDropdownList)}
                        />

                        {/* Dropdown List */}
                        {showDropdownList && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-40 max-h-[200px] overflow-y-auto">
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
                    <form onSubmit={handleSearch} className="w-full sm:w-auto">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center w-full sm:w-auto justify-center"
                        >
                            <FaSearch className="mr-2" /> Search
                        </button>
                    </form>
                </div>
            </div>

            <HotelPage />
        </>
    );
};

export default HotelExplore;
