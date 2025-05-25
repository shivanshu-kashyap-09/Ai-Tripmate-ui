import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Header = () => {
  // State for toggling menus and scroll effect
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // User info from localStorage
  const [userName, setUserName] = useState(localStorage.getItem("loginUserName"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("loginEmail"));
  const [userProfilePic, setUserProfilePic] = useState(localStorage.getItem("userProfilePic"));

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Scroll effect for header blur background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to localStorage changes (e.g., after login/logout)
  useEffect(() => {
    const updateUserInfo = () => {
      setUserName(localStorage.getItem("loginUserName"));
      setUserEmail(localStorage.getItem("loginEmail"));
      setUserProfilePic(localStorage.getItem("userProfilePic"));
    };

    window.addEventListener("storage", updateUserInfo);
    return () => window.removeEventListener("storage", updateUserInfo);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout clears localStorage and redirects
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <header
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${isScrolled ? "backdrop-blur-lg bg-black/40" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
          <span className="text-xl font-bold text-white">AI Tripmate</span>
        </Link>

        {/* Hamburger menu for mobile */}
        <button className="md:hidden text-2xl text-white mr-5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation */}
        <nav
          className={`md:flex md:items-center rounded-2xl absolute md:static top-20 left-58 text-center w-[45%] md:w-auto bg-black/50 md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 transition-all duration-300 ${isMobileMenuOpen ? "block" : "hidden"
            }`}
        >
          {/* Mobile: show user profile*/}
          <div className="md:hidden mb-4 text-white ">
            {userName ? (
              <div className="flex flex-col items-center text-white mb-4">
                {userProfilePic && (
                  <img src={userProfilePic} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
                )}
                <p className="text-lg font-semibold"> Welcome to {userName}</p>
                {/* <p className="text-sm text-gray-300">{userEmail}</p> */}
                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                >
                  Logout
                </button>
                <hr className=" border-black" />
              </div>
            ) : (
              <div className="flex justify-center gap-4 mb-4">
                <Link to="/login" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <Link to="/" className="block px-4 py-2 text-white hover:text-gray-300">Home</Link>
          <Link to="/fulltripexplore" className="block px-4 py-2 text-white hover:text-gray-300">Full Trip</Link>
          <Link to="/hotelexplore" className="block px-4 py-2 text-white hover:text-gray-300">Hotels</Link>
          <Link to="/restaurantexplore" className="block px-4 py-2 text-white hover:text-gray-300">Restaurants</Link>
          <Link to="/tripexplore" className="block px-4 py-2 text-white hover:text-gray-300">Trips</Link>
          <Link to="/travelexplore" className="block px-4 py-2 text-white hover:text-gray-300">Travel</Link>
          <Link to="/about" className="block px-4 py-2 text-white hover:text-gray-300">About</Link>
          <Link to="/feedback" className="block px-4 py-2 text-white hover:text-gray-300">Feedback</Link>
          <Link to="/contact" className="block px-4 py-2 text-white hover:text-gray-300">Contact</Link>
        </nav>

        {/* Desktop profile*/}
        {userName ? (
          <div className="relative hidden md:block">
            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center text-white">
              {userProfilePic ? (
                <img src={userProfilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              ) : (
                <span className="mr-2"> {userName}</span>
              )}
              {/* <FaChevronDown className="text-sm" /> */}
            </button>

            {isProfileDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-5 w-60  bg-white text-gray-800 shadow-lg rounded-lg py-2 border border-gray-300">
                {userProfilePic && <img src={userProfilePic} alt="Profile" className="w-16 h-16 mx-auto rounded-full my-2" />}
                <p className="px-4 py-2 font-semibold text-center">Welcome to {userName}</p>
                {/* <p className="px-4 py-2 text-sm text-gray-600">{userEmail}</p> */}
                <button
                  onClick={handleLogout}
                  className="block w-[40%] h-[40px] text-center ml-[30%] px-2 py-2 text-white hover:bg-red-500 bg-red-600 rounded-2xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
