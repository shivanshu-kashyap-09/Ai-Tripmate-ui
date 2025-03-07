import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const userName = localStorage.getItem("loginUserName");
  const userEmail = localStorage.getItem("loginEmail");
  const userProfilePic = localStorage.getItem("userProfilePic");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
        setIsServiceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${
        isScrolled ? "bg-blue-100 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo & Website Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
          <span className="text-xl font-bold text-gray-800">AI Tripmate</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 transition-all duration-300 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {/* Services Dropdown */}
          <div className="relative inline-block px-4 py-2">
            <button
              onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              Services <FaChevronDown className="ml-2 text-sm" />
            </button>
            {isServiceDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg py-2 border border-gray-300">
                <Link to="/service/full-trip" className="block px-4 py-2 hover:bg-gray-100">Full Trip</Link>
                <Link to="/service/hotel" className="block px-4 py-2 hover:bg-gray-100">Hotels</Link>
                <Link to="/service/restaurant" className="block px-4 py-2 hover:bg-gray-100">Restaurants</Link>
                <Link to="/service/trip" className="block px-4 py-2 hover:bg-gray-100">Trips</Link>
                <Link to="/service/travel" className="block px-4 py-2 hover:bg-gray-100">Travel</Link>
              </div>
            )}
          </div>
          <Link to="#about" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-blue-600">About</Link>
          <Link to="#feedback" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-blue-600">Feedback</Link>
          <Link to="#contact" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-blue-600">Contact</Link>
        </nav>

        {/* Right Section: Profile & Authentication */}
        <div className="flex items-center space-x-4">
          {userName ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={userProfilePic || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              />
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-4">
                  <div className="text-center">
                    <img
                      src={userProfilePic || "https://via.placeholder.com/40"}
                      alt="User"
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                    <p className="mt-2 font-semibold">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                  <hr className="my-2 border-gray-300" />
                  <button
                    onClick={() => {
                      localStorage.removeItem("isAuthenticated");
                      localStorage.removeItem("loginUserName");
                      localStorage.removeItem("loginEmail");
                      localStorage.removeItem("userProfilePic");
                      navigate("/login");
                    }}
                    className="w-full py-2 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">Login</button>
              <button onClick={() => navigate("/signup")} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">Signup</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;