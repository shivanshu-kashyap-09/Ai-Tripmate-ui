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

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="service/hotel" element={<HotelPage />} />
          <Route path="service/restaurant" element={<RestaurantPage />} />
          <Route path="service/travel" element={<TravelPage />} />
          <Route path="service/trip" element={<TripPage />} />
          <Route path="service/full-trip" element={<FullTripPage />} />
          <Route path="/fulltripexplore" element={<FullTripExplore />} />
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