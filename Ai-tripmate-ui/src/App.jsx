import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common-components/Layout";
import HomePage from "./Pages/HomePage";
import HotelPage from "./Pages/HotelPage";
import RestaurantPage from "./Pages/RestaurantPage";
import TravelPage from "./Pages/TravelPage";
import TripPage from "./Pages/TripPage";
import FullTripPage from "./Pages/FullTripPage";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import GoogleLoginButton from "./Pages/GoogleLoginButton";
import FullTripExplore from "./Explore/FullTripExplore";
import HotelExplore from "./Explore/HotelExplore";
import RestaurantExplore from './Explore/RestaurantExplore';
import TripExplore from './Explore/TripExplore';
import TravelExplore from './Explore/TravelExplore';
import About from "./common-components/About";
import Feedback from "./common-components/Feedback";
import Footer from "./common-components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/contact" element={<Footer/>} />
          <Route path="/fulltripexplore" element={<FullTripExplore />} />
          <Route path="/hotelexplore" element={<HotelExplore />} />
          <Route path="/restaurantexplore" element={<RestaurantExplore />} />
          <Route path="/tripexplore" element={<TripExplore />} />
          <Route path="/travelexplore" element={<TravelExplore />} />
        </Route>

        {/* Keep login and signup separate if they don't need Header/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<GoogleLoginButton />} />
      </Routes>
    </Router>
  );
}
export default App;