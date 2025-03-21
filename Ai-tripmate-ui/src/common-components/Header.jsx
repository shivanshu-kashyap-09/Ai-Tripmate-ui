import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import LoginPage from "../Pages/LoginPage";
import Signup from "../Pages/Signup";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const userName = localStorage.getItem("loginUserName");
  const userEmail = localStorage.getItem("loginEmail");
  const userProfilePic = localStorage.getItem("userProfilePic");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
        setIsServiceDropdownOpen(false);
        setIsAuthDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed w-full top-0 z-20 transition-all duration-300 ${
          isScrolled || isAuthModalOpen ? "backdrop-blur-lg bg-black/40" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
            <span className="text-xl font-bold text-white">AI Tripmate</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <nav
            className={`md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 transition-all duration-300 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <Link to="/" className="block md:inline-block px-4 py-2 text-white hover:text-gray-300">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative inline-block px-4 py-2">
              <button
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className="flex items-center text-white hover:text-gray-300"
              >
                Services <FaChevronDown className="ml-2 text-sm" />
              </button>
              {isServiceDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg py-2 border border-gray-300">
                  <Link to="/fulltripexplore" className="block px-4 py-2 hover:bg-gray-100">Full Trip</Link>
                  <Link to="/hotelexplore" className="block px-4 py-2 hover:bg-gray-100">Hotels</Link>
                  <Link to="/restaurantexplore" className="block px-4 py-2 hover:bg-gray-100">Restaurants</Link>
                  <Link to="/tripexplore" className="block px-4 py-2 hover:bg-gray-100">Trips</Link>
                  <Link to="/travelexplore" className="block px-4 py-2 hover:bg-gray-100">Travel</Link>
                </div>
              )}
            </div>

            <Link to="/about" className="block md:inline-block px-4 py-2 text-white hover:text-gray-300">About</Link>
            <Link to="/feedback" className="block md:inline-block px-4 py-2 text-white hover:text-gray-300">Feedback</Link>
            <Link to="/contact" className="block md:inline-block px-4 py-2 text-white hover:text-gray-300">Contact</Link>

            {/* Mobile Authentication Dropdown */}
            <div className="md:hidden relative px-4 py-2">
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="flex items-center text-white hover:text-gray-300"
              >
                Account <FaChevronDown className="ml-2 text-sm" />
              </button>
              {isAuthDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg py-2 border border-gray-300">
                  {userName ? (
                    <>
                      <p className="px-4 py-2">{userName}</p>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setAuthMode("login"); setIsAuthModalOpen(true); }}>Login</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setAuthMode("signup"); setIsAuthModalOpen(true); }}>Signup</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Authentication Buttons */}
          {!userName ? (
            <div className="hidden md:flex space-x-4">
              <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all" onClick={() => { setAuthMode("login"); setIsAuthModalOpen(true); }}>Login</button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all" onClick={() => { setAuthMode("signup"); setIsAuthModalOpen(true); }}>Signup</button>
            </div>
          ) : null}
        </div>
      </header>

      {/* AUTH MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            <button className="absolute top-2 right-2 text-gray-500 text-xl" onClick={() => setIsAuthModalOpen(false)}>✖</button>
            {authMode === "login" ? <LoginPage onClose={() => setIsAuthModalOpen(false)} /> : <Signup onClose={() => setIsAuthModalOpen(false)} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
