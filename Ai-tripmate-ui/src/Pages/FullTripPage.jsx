import React from 'react'
import { useLocation } from 'react-router-dom'
import HotelPage from './HotelPage'
import RestaurantPage from './RestaurantPage'
import TripPage from './TripPage'
import TravelPage from './TravelPage'

function FullTrip() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Unknown Location";
  const destination = params.get("destinationLocation") || "Unknown Destination";
  const date = params.get("date") || "N/A";
  const people = params.get("people") || "N/A";
  const days = params.get("days") || "N/A";
  const userBudget = params.get("budget") || "N/A";

  return (
    <div>
      <div className="mt-20 px-6">
        <h1 className="text-center text-3xl font-bold my-6">full on {userLocation} to {destination}</h1>
        <HotelPage />
        <RestaurantPage />
        <TripPage />
        <TravelPage />
      </div>
    </div>
  )
}

export default FullTrip;