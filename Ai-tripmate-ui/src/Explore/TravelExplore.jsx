import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/travelBg.jpg";
import { useNavigate } from "react-router-dom";
import TravelPage from "../Pages/TravelPage";

const TravelExplore = () => {
  const [selectedOption, setSelectedOption] = useState("Travel");
  const [destination, setDestination] = useState({ fromDes: "Delhi", toDes: "Haridwar" });
  const [dateRange, setDateRange] = useState({ checkIn: "", checkOut: "" });

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}`;
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/travrlexplore?from=${destination.fromDes}&to=${destination.toDes}&checkIn=${dateRange.checkIn}&checkOut=${dateRange.checkOut}`);
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
          <h1 className="text-4xl font-bold text-blue-700">🌍 Making Every Trip Memorable!</h1>
          <p className="text-lg mt-2 text-blue-600">🏕️ Discover the World with Ease!</p>
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
              value={`${destination.fromDes} -> ${destination.toDes}`}
              onChange={(e) => {
                const inputValue = e.target.value;
                const parts = inputValue.split(" -> ");
                if (parts.length <= 2) {
                  setDestination({ fromDes: parts[0] || "", toDes: parts[1] || "" });
                }
              }}
              className="outline-none w-full"
            />
          </div>

          {/* Date Picker */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1">
            <FaCalendarAlt className="text-gray-500 mr-2" />

            {/* Check-in Date */}
            <input
              type="date"
              id="checkIn"
              value={dateRange.checkIn}
              onChange={(e) => setDateRange({ ...dateRange, checkIn: e.target.value })}
              className="absolute opacity-0 w-0 h-0"
            />
            <span
              onClick={() => document.getElementById("checkIn").showPicker()}
              className="cursor-pointer w-1/2 text-gray-700"
            >
              {dateRange.checkIn ? formatDate(dateRange.checkIn) : "DD-MM"}
            </span>

            <span className="mx-2">→</span>

            {/* Check-out Date */}
            <input
              type="date"
              id="checkOut"
              value={dateRange.checkOut}
              onChange={(e) => setDateRange({ ...dateRange, checkOut: e.target.value })}
              className="absolute opacity-0 w-0 h-0"
            />
            <span
              onClick={() => document.getElementById("checkOut").showPicker()}
              className="cursor-pointer w-1/2 text-gray-700"
            >
              {dateRange.checkOut ? formatDate(dateRange.checkOut) : "DD-MM"}
            </span>
          </div>

          {/* Search Button */}
          <form onSubmit={handleSearch}>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
              <FaSearch className="mr-2" /> Search
            </button>
          </form>

        </div>
      </div>
      <TravelPage />
    </>
  );
};

export default TravelExplore;