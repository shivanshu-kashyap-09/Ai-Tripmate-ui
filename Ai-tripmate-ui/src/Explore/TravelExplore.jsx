import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import logo from "../assets/travelBg.jpg";
import { useNavigate } from "react-router-dom";
import TravelPage from "../Pages/TravelPage";

const TravelExplore = () => {
  const [selectedOption, setSelectedOption] = useState("Travel");
  const [destination, setDestination] = useState({ fromDes: "Haridwar", toDes: "Delhi" });
  const [showDestination, setShowDestination] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/travelexplore?from=${destination.fromDes}&to=${destination.toDes}&date=${selectedDate.toISOString().split("T")[0]}`);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    navigate(`/${option.toLowerCase()}explore`);
  };

  return (
    <>
      {/* ✅ Background Image Section */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">
            🌍 Making Every Trip Memorable!
          </h1>
          <p className="text-lg mt-2 text-blue-600">🏕️ Discover the World with Ease!</p>
        </div>

        {/* ✅ Navigation (Now Stacks on Mobile) */}
        <div className="relative z-30 flex flex-wrap sm:flex-wrap lg:flex-row justify-center bg-white rounded-lg shadow-lg p-2 gap-2 sm:gap-4 text-black mt-6 sm:mt-8 w-full lg:w-auto max-w-md lg:max-w-full overflow-x-auto">
          {["FullTrip", "Hotel", "Restaurant", "Trip", "Travel"].map((option) => (
            <button
              key={option}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium ${selectedOption === option
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* ✅ Search Bar (Stacks on Small Screens) */}
        <div className="relative z-20 mt-6 sm:mt-10 bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-4 w-[90%] sm:w-[80%] max-w-4xl text-black">

          {/* 🔹 Destination Input */}
          <div
            className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 relative cursor-pointer w-full sm:w-auto"
            onClick={() => setShowDestination(true)}
          >
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <span className="w-full">{`${destination.fromDes} to ${destination.toDes}`}</span>
            <IoIosArrowDown className="text-gray-500" />

            {/* Dropdown for Selecting Destination */}
            {showDestination && (
              <div className="absolute top-full left-0 bg-white shadow-lg p-4 z-40 rounded-md w-60">
                <p className="text-sm font-medium">Select From & To Destination</p>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>From</span>
                    <input
                      type="text"
                      className="border px-2 rounded-md w-40"
                      defaultValue={destination.fromDes}
                      id="fromInput"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>To</span>
                    <input
                      type="text"
                      className="border px-2 rounded-md w-40"
                      defaultValue={destination.toDes}
                      id="toInput"
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

          {/* 🔹 Date Picker */}
          <div
            className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 relative cursor-pointer w-full sm:w-auto"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="w-full">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
                : "Select Date"}
            </span>
            <IoIosArrowDown className="text-gray-500" />

            {/* Calendar Popup */}
            {showDatePicker && (
              <div className="absolute top-full left-0 bg-white shadow-lg p-4 z-40 rounded-md">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowDatePicker(false); // Close after selection
                  }}
                  inline
                />
              </div>
            )}
          </div>

          {/* 🔹 Search Button */}
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

      <TravelPage />
    </>
  );
};

export default TravelExplore;
