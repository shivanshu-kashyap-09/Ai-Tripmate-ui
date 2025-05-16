import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [userName, setUserName] = useState(localStorage.getItem("loginUserName"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("loginEmail"));
  const [userProfilePic, setUserProfilePic] = useState(localStorage.getItem("userProfilePic"));

  const navigate = useNavigate();
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateUserInfo = () => {
      setUserName(localStorage.getItem("loginUserName"));
      setUserEmail(localStorage.getItem("loginEmail"));
      setUserProfilePic(localStorage.getItem("userProfilePic"));
      console.log(userProfilePic);
    };

    window.addEventListener("storage", updateUserInfo);
    return () => window.removeEventListener("storage", updateUserInfo);
  }, []);

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
  
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <header
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-black/40" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
          <span className="text-xl font-bold text-white">AI Tripmate</span>
        </Link>

        <button className="md:hidden text-2xl text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          className={`md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 transition-all duration-300 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/" className="block md:inline-block px-4 py-2 text-white hover:text-gray-300">Home</Link>

          <div className="relative inline-block px-4 py-2">
            <button
              onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              className="flex items-center text-white hover:text-gray-300"
            >
              Services <FaChevronDown className="ml-2 text-sm" />
            </button>
            {isServiceDropdownOpen && (
              <div 
              ref={dropdownRef}
              className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg py-2 border border-gray-300">
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
        </nav>

        {userName ? (
          <div className="relative ">
            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center text-black">
              {userProfilePic ? (
                <img src={userProfilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              ) : (
                <span className="mr-2">{userName}</span>
              )}
              <FaChevronDown className="text-sm" />
            </button>

            {isProfileDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-60 bg-white text-gray-800 shadow-lg rounded-lg py-2 border border-gray-300">
                {userProfilePic && <img src={userProfilePic} alt="Profile" className="w-16 h-16 mx-auto rounded-full my-2" />}
                <p className="px-4 py-2 font-semibold text-center">{userName}</p>
                <p className="px-4 py-2 text-sm text-gray-600">{userEmail}</p>
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
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
