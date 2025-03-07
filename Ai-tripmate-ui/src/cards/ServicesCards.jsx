import React from 'react';
import logo1 from '../assets/FullTrip.png';
import logo2 from '../assets/Hotel.png';
import logo3 from '../assets/Restaurant.jpg';
import logo4 from '../assets/Travel.jpg';
import logo5 from '../assets/Trip.png';
import { Link } from 'react-router-dom';
import fullTripExplore from "../Explore/FullTripExplore";

const ServiceCard = () => {
    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto flex flex-col gap-16">
                
                {/* Card 1 - FULL TRIP SERVICE */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                    <img src={logo1} alt="VIP Travel" className="w-full md:w-[45%] h-auto rounded-lg shadow-md" />
                    <div className="md:w-[50%]">
                        <h2 className="text-4xl font-semibold text-blue-800">FULL TRIP SERVICE</h2>
                        <br/>
                        <p className="text-gray-700 mt-3 leading-relaxed pr-10">
                            Plan Your Perfect Trip with Ease! Our Full Trip Service is designed to provide a seamless and hassle-free travel experience. Simply enter your trip details, and we will generate a personalized travel itinerary based on your preferences and budget. 
                        </p>
                        <ul className="text-gray-600 mt-3 pr-10">
                            <li>✅ Budget-Friendly Options – We ensure that all recommendations fit within your specified budget.</li>
                            <li>✅ Time-Saving Planning – No need to search for hotels, restaurants, or transportation separately.</li>
                            <li>✅ Personalized Experience – We tailor the trip plan based on your preferences and travel style.</li>
                            <li>✅ Comprehensive Travel Guide – Get a full itinerary with locations, places to visit, and where to stay & eat.</li>
                        </ul>
                        <Link to="/fulltripexplore" className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
                            Explore
                        </Link>
                    </div>
                </div>

                {/* Card 2 - HOTEL SERVICE */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img src={logo2} alt="Hotel Service" className="w-full md:w-[45%] h-auto rounded-lg shadow-md" />
                    <div className="md:w-[50%]">
                        <h2 className="text-4xl font-semibold text-blue-800 pl-10">HOTEL SERVICE 🏨</h2>
                        <br/>
                        <p className="text-gray-700 mt-3 leading-relaxed pl-10">
                             Find the perfect stay with our curated list of top hotels. Whether you’re looking for a luxurious resort, a budget-friendly inn, or a cozy boutique hotel, we have the best options for you.
                        </p>
                        <ul className="text-gray-600 mt-3 pl-10">
                            <li>✅ Handpicked Hotels – Choose from 3-star to 5-star hotels based on your budget.</li>
                            <li>✅ Best Deals – Get exclusive discounts and deals on premium stays.</li>
                            <li>✅ Prime Locations – Stay in well-connected areas with easy access to attractions.</li>
                            <li>✅ Customer Reviews & Ratings – Make informed choices with real traveler feedback.</li>
                        </ul>
                        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300 ml-10">
                        Explore
                            
                        </button>
                    </div>
                </div>

                {/* Card 3 - RESTAURANT SERVICE */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                    <img src={logo3} alt="Restaurant Service" className="w-full md:w-[45%] h-auto rounded-lg shadow-md" />
                    <div className="md:w-[50%]">
                        <h2 className="text-4xl font-semibold text-blue-800 pr-10">RESTAURANT SERVICE 🍽</h2>
                        <br/>
                        <p className="text-gray-700 mt-3 leading-relaxed pr-10">
                             Discover top-rated restaurants serving delicious food at your destination. Whether you crave local delicacies, international cuisine, or street food, we’ve got you covered!
                        </p>
                        <ul className="text-gray-600 mt-3 pr-10">
                            <li>✅ 10 Best Restaurant Suggestions – Based on your preferences and location.</li>
                            <li>✅ Variety of Cuisine – From fine dining to casual eateries and cafés.</li>
                            <li>✅ Budget-Friendly Choices – Affordable meal options that fit your travel budget.</li>
                            <li>✅ Authentic Local Experiences – Explore regional flavors and must-try dishes.</li>
                        </ul>
                        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
                        Explore
                            
                        </button>
                    </div>
                </div>

                {/* Card 4 - TRIP SERVICE */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img src={logo4} alt="Trip Service" className="w-full md:w-[45%] h-auto rounded-lg shadow-md" />
                    <div className="md:w-[50%]">
                        <h2 className="text-4xl font-semibold text-blue-800 pl-10">TRIP SERVICE 🌍</h2>
                        <br/>
                        <p className="text-gray-700 mt-3 leading-relaxed pl-10">
                             Plan your dream trip effortlessly! Our Trip Service generates a fully customized itinerary based on your budget, travel dates, and group size.
                        </p>
                        <ul className="text-gray-600 mt-3 pl-10">
                            <li>✅ Personalized Travel Plan – Enter your destination, budget, duration, and number of travelers.</li>
                            <li>✅ 10 Best Hotels & Restaurants – Stay and dine at the most recommended places.</li>
                            <li>✅ Travel Routes & Attractions – Get the best transport options and must-visit places.</li>
                            <li>✅ Hassle-Free Booking – Everything planned for you in one simple package.</li>
                        </ul>
                        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300 ml-10">
                        Explore   
                            
                        </button>
                    </div>
                </div>

                {/* Card 5 - TRAVEL SERVICE */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                    <img src={logo5} alt="Travel Service" className="w-full md:w-[45%] h-auto rounded-lg shadow-md" />
                    <div className="md:w-[50%]">
                        <h2 className="text-4xl font-semibold text-blue-800 pr-10">TRAVEL SERVICE 🚗</h2>
                        <br/>
                        <p className="text-gray-700 mt-3 leading-relaxed pr-10">
                             Get convenient transportation options tailored to your needs. Whether you're looking for flights, buses, trains, or private cabs, we help you find the best way to travel.
                        </p>
                        <ul className="text-gray-600 mt-3 pr-10">
                            <li>✅ Flight, Bus & Train Tickets – Compare and book at the best prices.</li>
                            <li>✅ Cab & Car Rentals – Choose from self-drive rentals or chauffeur services.</li>
                            <li>✅ Seamless Transfers – Airport pickups, drop-offs, and intercity transport available.</li>
                            <li>✅ Real-Time Availability & Best Routes – Save time and enjoy a smooth journey.</li>
                        </ul>
                        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
                        Explore
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServiceCard;
